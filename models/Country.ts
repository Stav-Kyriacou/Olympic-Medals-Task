import { Result } from './Result';
import { Medals } from './Medals.enum';

export class Country {
  // TODO: Country requires a name attribute and a results attribute.
  // name is a string, results is an array of Result
  
  // TODO: receives a name and initialises the results array to an empty array
  constructor(name: string) {
    
  }

  // return the total number of medals
  totalMedals(): number {
    //TODO: complete
  }


  // given a medal type, return the amount of that type of medal
  totalMedalType(medal: Medals): number {
    // TODO:
  }

}