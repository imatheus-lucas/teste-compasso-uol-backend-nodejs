import { Request, Response } from 'express'

class ClientsController {
    public async create(request: Request, response: Response): Promise<any> {
        // const { name, email, password } = request.body;
        // const client = await Clients.create({
        //     name,
        //     email,
        //     password,
        // });
        // return response.json(client);
        return response.json({ ok: 'true' })
    }
}
export default new ClientsController()
