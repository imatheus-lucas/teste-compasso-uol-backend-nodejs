import EntityValidation from '@shared/infra/typeorm/validations/EntityValidation'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm'
import { Length, validate as classValidator } from 'class-validator'

import City from '@modules/cities/infra/typeorm/entities/City'

@Entity('clients')
export default class Client extends EntityValidation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Length(3, 180)
    @Column({ type: 'varchar', length: '180' })
    name: string

    @Length(1, 1)
    @Column({ type: 'char', length: '1' })
    genrer: string

    @Column({ type: 'timestamp' })
    birth_date: Date

    @Column({ type: 'numeric' })
    years_old: Number

    @ManyToOne(() => City, citites => citites.id)
    city: City

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
