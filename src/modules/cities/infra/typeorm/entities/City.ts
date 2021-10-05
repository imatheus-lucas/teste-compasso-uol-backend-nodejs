import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
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

    @Length(2, 3)
    @Column({ type: 'varchar', length: '3' })
    state: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    async validate(): Promise<void> {
        const errors = await classValidator(this)
        if (errors.length > 0) {
            throw new HttpError('Invalid city data', 400)
        }
        return
    }
}
