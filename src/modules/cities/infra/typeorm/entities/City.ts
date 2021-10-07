import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'
import { Length, validate as classValidator } from 'class-validator'
import HttpError from '@shared/errors/HttpError'
import EntityValidation from '@shared/infra/typeorm/validations/EntityValidation'
import Client from '@modules/clients/infra/typeorm/entities/Client'

@Entity('cities')
export default class City extends EntityValidation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Length(3, 185)
    @Column({ type: 'varchar', length: '185' })
    name: string

    @Length(2, 3)
    @Column({ type: 'varchar', length: '3' })
    state: string

    @OneToMany(() => Client, client => client.city)
    clients: Client[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
