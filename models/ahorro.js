import {model, Schema} from 'mongoose'

const ahorroSchema = new Schema ({
    account_number:{
        type:Number,
        unique: true,
    },
    document:{
        type: String,
        require: true
    },
    opening_date:{
        type:String,
        default: Date.now,
    },
    balance:{
        type: Number,
        default: 0,
        min: [0, 'The balance cannot be negative']
    }, 
    access_key:{
        type: S,
        required: true,
        minlength: [4, 'Min 4 characters'],
        maxlength: [4, 'Max 4 characters']
    }

})

export default model("Ahorro", ahorroSchema, "ahorro") 
