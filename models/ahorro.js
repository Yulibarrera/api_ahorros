import { model, Schema } from 'mongoose';

const ahorroSchema = new Schema({
    account_number: {
        type: Number,
        unique: true
    },
    document: {
        type: String,
        required: true,
    },
    opening_date: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'El balance no puede ser negativo']
    },
    access_key: {
        type: String,
        required: true,
        minlength: [4, 'Min 4 characters'],
        maxlength: [4, 'Max 4 characters']
    }
});

ahorroSchema.pre('save', async function (next) {
    if (this.isNew) { 
        const lastAccount = await this.constructor.findOne().sort({ account_number: -1 });
        this.account_number = lastAccount ? lastAccount.account_number + 1 : 58000;
    }
    next();
})

export default model("Ahorro", ahorroSchema, 'ahorro');
