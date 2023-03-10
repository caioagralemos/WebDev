const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const opts = {toJSON: {virtuals: true}}

const campoSchema = new Schema ({
    titulo: String,
    preco: Number,
    descricao: String,
    endereco: String,
    cidade: String,
    verificado: Boolean,
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    telefone: String,
    instagram: String,
    imagem: [
        {
            url: String,
            filename: String
        }
    ],
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

campoSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campos/${this.id}">${this.titulo}</a></strong>`
})

campoSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campo', campoSchema)