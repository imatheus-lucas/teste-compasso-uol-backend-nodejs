import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { Length, validate as classValidator } from 'class-validator'
import HttpError from '@shared/errors/HttpError'

@Entity('cities')
export default class City {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Length(3, 180)
    @Column({ type: 'varchar', length: '180' })
    name: string

    @Length(1, 1)
    @Column({ type: 'char', length: '1' })
    genre: string

    @Column({ type: 'timestamp' })
    birth_date: Date

    @Column({ type: 'numeric' })
    years_old: Number

    @OneToOne(() => City)
    @JoinColumn()
    city: City

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    async validate(): Promise<void> {
        const errors = await classValidator(this)
        if (errors.length > 0) {
            throw new HttpError('Invalid client data', 400)
        }
    }
}
