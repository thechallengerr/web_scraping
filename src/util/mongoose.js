module.exports= {
    mongooseToMultipleObjects: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject());
    },

    mongooseToSignleObject: function(mongoose){
        
        return mongoose ? mongoose.toObject() : mongoose;
    }

}