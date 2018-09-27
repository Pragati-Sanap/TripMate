var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var PersonSchema = new Schema({
    name: String,
    age: Number,
    stories: [{ type: Schema.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
    _creator: { type: Schema.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);


var person = {

    Create: function (req, res) {
        var aaron = new Person({ name: 'Aaron', age: 100 });

        aaron.save(function (err) {
            if (err)
                console.log(err);

            var story1 = new Story({
                title: "A man who cooked Nintendo"
                , _creator: aaron._id
            });

            story1.save(function (err, user) {
                if (err) console.log(err);
                else
                    console.log(user)
            });
        })
    },
    populate: function (req, res) {
        Story.findOne({ title: /Nintendo/i })
            .populate('_creator') // <--
            .exec(function (err, story) {
                if (err) console.log('err');
                console.log('The creator is %s', story._creator.name);
                console.log(story);
                // prints "The creator is Aaron"
            })
    },
    populate1: function (req, res) {
        Story
            .findOne({ title: /Nintendo/i })
            .populate('_creator', ['name']) // <-- only return the Persons name
            .exec(function (err, story) {
                if (err) console.log('err');

                console.log('The creator is %s', story._creator.name);
                // prints "The creator is Aaron"

                console.log('The creators age is %s', story._creator.age)

                // prints "The creators age is null'
            })
    },
    fans: function (req, res) {
        Story
            .findOne({ title: /Nintendo/i })
            .populate('fans', null, { age: { $gte: 21 } }, { limit: 5 })
            .exec(function(err,story){
                if(err)console.log('err');
                else
                console.log(story);
            })
    }
}

module.exports = person;