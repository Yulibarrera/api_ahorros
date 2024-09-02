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
        res.status(500).json({ message: 'Error creating account', error });
    }
}

export async function deleteAccount(req, res) {
    let msg = 'Deleted Account';
    const id = req.params.id;

    try {
        const account = await Ahorro.findById(id);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        if (account.balance > 0) {
            return res.status(400).json({ message: 'Cannot delete an account with a positive balance' });
        }

        await Ahorro.findByIdAndDelete(id);
    } catch (error) {
        msg = 'There was a problem deleting the Account';
    }

    res.json({ msg: msg });
}

export async function deposit(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: 'The quantity must be greater than zero' });
    }

    try {
        const account = await Ahorro.findById(id);
        console.log('Account found:', account); 

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        account.balance += amount;
        console.log('New balance:', account.balance); 

        await account.save();

        res.json({ message: 'Consigned money', account });
    } catch (error) {
        console.error('Error during deposit:', error);
    }
}

export async function withdraw(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const account = await Ahorro.findById(id);
        if (account) {
            if (account.balance >= amount) {
                account.balance -= amount;
                await account.save();
                res.json({ message: 'Money withdrawn', account });
            } else {
                res.status(400).json({ message: 'Insufficient funds' });
            }
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error when withdrawing money' });
    }
}
