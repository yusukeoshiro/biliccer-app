import * as functions from 'firebase-functions';
const cors = require('cors')({origin: true});


export const onGameEnd = functions.https.onRequest((req, res) => {


  cors(req, res, () => {

    const { PubSub } = require('@google-cloud/pubsub');
    const pubsub = new PubSub({
      projectId: 'biliccer-2018',
      keyFilename: './key.json'    
    })    

    const topic = pubsub.topic('match-completed');
    const publisher = topic.publisher();
    const data = Buffer.from(JSON.stringify(req.body.data));
    
    const callback = function(err, messageId) {
      if (err) {
        // Error handling omitted.
      }
    };    
    publisher.publish(data, callback);
    res.status(200).send();
  });
})


