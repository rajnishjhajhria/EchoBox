require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/echobox';

const dummyPosts = [
  {
    tag: "Teacher",
    content: "Prof. Anderson's new grading curve in Data Structures really saved us this semester! The detailed feedback on assignments is incredibly helpful.",
    upvotedBy: [], downvotedBy: [], commentList: [
      { author: "student_42", text: "Agreed, wish more professors did this." }
    ]
  },
  {
    tag: "Event",
    content: "The spring career fair was way too crowded this year. We need a bigger venue or staggered entry times because I couldn't even reach some of the booths.",
    upvotedBy: [], downvotedBy: [], commentList: []
  },
  {
    tag: "Facility",
    content: "Can we get the printers in the North Library fixed? Three of them have been jammed since Tuesday and midterms are approaching.",
    upvotedBy: [], downvotedBy: [], commentList: []
  },
  {
    tag: "Student Life",
    content: "We should have more healthy vegetarian options in the main dining hall. The salad bar is good but it gets highly repetitive.",
    upvotedBy: [], downvotedBy: [], commentList: []
  },
  {
    tag: "Teacher",
    content: "The guest speaker in Introduction to Sociology was phenomenal! Can we invite more industry professionals to share real-world perspectives?",
    upvotedBy: [], downvotedBy: [], commentList: []
  },
  {
    tag: "Event",
    content: "The hackathon ran out of pizza by 9 PM! Please budget for more food next time for the late-night coders.",
    upvotedBy: [], downvotedBy: [], commentList: []
  },
  {
    tag: "Facility",
    content: "The new gym equipment is absolutely superb, but it would be great if the gym stayed open until midnight on weekends too.",
    upvotedBy: [], downvotedBy: [], commentList: [
      { author: "fitness_fan", text: "Yes! 10 PM is simply too early to close on a Saturday." }
    ]
  },
  {
    tag: "Student Life",
    content: "Could we organize more casual weekend mixers for commuter students? It's really hard to meet people if you don't live in the dorms.",
    upvotedBy: [], downvotedBy: [], commentList: []
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Seeding');
    // We intentionally don't wipe the DB so your previous data is intact!
    await Post.insertMany(dummyPosts);
    console.log('Inserted dummy feedback across all categories successfully!');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
    process.exit(1);
  });
