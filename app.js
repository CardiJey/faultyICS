const fs = require('fs');
const ICAL = require('ical.js');

fs.readFile('./faulty.ics', 'utf8', (err, data) => {
    if (err) throw err;
	
	const icsFileString = data;
    const jcalData = ICAL.parse(icsFileString);
    const comp = new ICAL.Component(jcalData);
    const allEvents = comp.getAllSubcomponents('vevent');

    for(let i = 0; i < allEvents.length; i++){
        const thisEvent = new ICAL.Event(allEvents[i]);
        console.log("Begin reading next ical event: " + thisEvent.summary)

        if(thisEvent.isRecurring()){            
            const thisIterator = thisEvent.iterator();
            let maxRecurs = 100;

            while(!thisIterator.complete && maxRecurs > 0){
                console.log("Trying to call .next()")
                thisDate = thisIterator.next();
                console.log("Succeded with next Date: " + thisDate)
                maxRecurs--;
            }
        }
    }  
    
    console.log("End");
});