import City from '@modules/cities/infra/typeorm/entities/City'

export default interface ICreateClientDTO {
    name: string
    genrer: string
    birth_date: string
    years_old: number
    city?: City
    cityId: string
}
