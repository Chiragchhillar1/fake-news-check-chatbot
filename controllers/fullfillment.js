const axios = require('axios');
const fetch = require('node-fetch');

class DialogflowFullfillment
{
    constructor(request){
        this.req = request;
    }

    // Response to Dialogflow welcome message
    DefaultWelcomeIntent()
    {
        let mainResponse = {
            "fulfillmentMessages": [
              {
                "quick_replies" : {
                  "title" : "Together we fight fake NEWS. Please select a topic, channel or sitename from below:",
                  "quick_replies" : [
                    "Coronavirus",
                    "NDTV",
                    "The Logical Indian",
                    "ALT NEWS",
                    "ABP NEWS",
                    "India Today",
                    "2020 Delhi riots",
                    "NEWS Checker",
                    "Lead Stories",
                    "Facebook",
                    "NY Times",
                    "WashingtonPost"
                  ]
                }
              }
            ]
          }

        return mainResponse
    }

      // Check news channel wise
    checkNewsChannel = async() => 
    {
      let channel = this.req.queryResult.parameters.newschannel;
      let getResponse = await this.makeRequest(channel)

      let responseArray = getResponse.claims;
      let cardArray = [{
        "text": {
          "text": [
            `NEWS related to ${channel}`
          ]
        }
      }]

      responseArray.forEach(element => {
          
          cardArray.push({
            "card": {
              "title": `Status: ${element.claimReview[0].textualRating}`,
              "subtitle": `${element.text} - by  ${element.claimant}`,
              "imageUri": 'https://static.scientificamerican.com/sciam/cache/file/DFD3D397-B132-4516-9D8D0C7B4F07763B_source.jpg?w=590&h=800&2A4ADDE6-C642-4536-8CBD4821540D9D7F',
              "buttons": [
                {
                  "text": "Details",
                  "postback": `${element.claimReview[0].url}`
                }
              ]
            }
          })
      });
      
      let mainResponse = {
        "fulfillmentMessages": 
          cardArray
        
      }

    return mainResponse
    }

      //making request to google apis
    makeRequest = async(channelName) => 
    {
      const apiUrl = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${channelName}&maxAgeDays=10&key=AIzaSyCud0CBDUq-AEoAbNQxwRpikgvEFURj5oY`
        
      try {
        const res = await axios.get(apiUrl);
    
        const todos = res.data;
    
        return todos;
      } catch (e) {
        console.error(e);
      }
    }

    // checkNewsChannelnew()
    // {
    //     console.log(this.req.responseId)
    //     const apiUrl = "https://factchecktools.googleapis.com/v1alpha1/claims:search?reviewPublisherSiteFilter=nytimes.com&key=AIzaSyCud0CBDUq-AEoAbNQxwRpikgvEFURj5oY"
        
    //     const getResponse = async() => {

    //         const fetchResponse = await fetch(apiUrl)

    //         const json = await fetchResponse.json()
    //         return json;

    //     }

    //     return getResponse

    // }

    // checkNewsChannels()
    // {
    //     console.log(this.req.responseId)
    //     const apiUrl = "https://factchecktools.googleapis.com/v1alpha1/claims:search?reviewPublisherSiteFilter=nytimes.com&key=AIzaSyCud0CBDUq-AEoAbNQxwRpikgvEFURj5oY"
        
    //     let getResponse = []
    //     axios.get(apiUrl)
    //     .then(response => {
    //         getResponse = response.data
    //         console.log(getResponse);
    //         return getResponse
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    //     return getResponse
    // }

}

module.exports = DialogflowFullfillment