const express = require("express");
const cors = require("cors");
const controller = require('./controller.js')

const app = express();

//middlewares
app.use(cors());
app.use(express.json());


app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["You will win the lottery this week!",
					 "A great coding adventure lies ahead of you.",
					 "You will become the next great coder of the universe.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});

app.get(`/api/quotes`, controller.getQuotes);
app.delete(`/api/quotes/:id`, controller.deleteQuote);
app.post(`/api/quotes/`, controller.createQuote);
app.put(`/api/quotes/:id`, controller.updateQuote);


app.listen(4000, () => console.log("Server running on 4000"));
