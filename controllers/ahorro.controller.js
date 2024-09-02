import Ahorro from '../models/ahorro.js';

export async function  getAccounts (req, res){
    try {
        const accounts = await Ahorro.find();
        res.json(accounts)
    } 
    catch(error) {
        res.status(500).json({msg: 'Error getting accounts', error})
    }
}

export async function  postAccount(req, res){
    try{
        const { document, access_key} = req.body

        if (!document || !access_key) {
            return res.status(400).json({msg: 'Document and access code are required '})
        }

        const newAccount = new Ahorro({
            document,
            access_key,
            balance: 0,
        })

        await newAccount.save()
        res.json({ message: 'Created Account', newAccount });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la cuenta', error });
    }
}

export async function deleteAccount (req, res) {
    let msg = 'Account delete'
    id = req.params.id
    try{
        const account = await Ahorro.findById(id);
        if (!account) return res.status(404).json({ message: 'Cuenta no encontrada' })

        if (account.balance > 0) {
            return res.status(400).json({ message: 'No se puede eliminar una cuenta con saldo positivo' });
        }

        await Vehicle.findByIdAndDelete({_id:id})

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cuenta', error });
    }
};