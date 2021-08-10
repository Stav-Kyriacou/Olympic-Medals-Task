import './style.css';
import { Countries } from './models/Countries.enum';
import { Country } from './models/Country';
import { Sports } from './models/Sports.enum';
import { Medals } from './models/Medals.enum';
import { IResult } from './models/IResult';
// TODO: required imports

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);

const addButton: HTMLElement = document.getElementById('add-btn');
const resultsTable: HTMLTableElement = document.getElementById('results-table') as HTMLTableElement;

addButton.addEventListener('click', addMedal);
resultsTable.addEventListener('click', viewResults);

let countries: Array<Country> = [];

init();

// This function sets up some display elements
function init() {
  let count = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }

  count = 0;
  //TODO: populate the Sport select
  for (let s in Sports) {
    if (isNaN(Number(s))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = s;
      newOption.value = count.toString();
      count++;
      sportSelect.add(newOption);
    }
  }

  //TODO: populate the Medal select
  count = 0;
  for (let m in Medals) {
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m;
      newOption.value = count.toString();
      count++;
      medalSelect.add(newOption);
    }
  }
}

// This function adds a medal to the countries tally
function addMedal() {

  let countryExists: Boolean = false;
  let currentCountry: Country;
  
  //create a new result
  let newResult: IResult = {
  sport: sportSelect.selectedIndex,
  medal: Medals[medalSelect.selectedOptions[0].innerHTML]
  // medal: Medals[medalSelect.options[medalSelect.selectedIndex].innerHTML]
  };

  //check if the current country already exists in the array
  for (let c of countries) {
    if (countrySelect.selectedOptions[0].innerHTML === c.name) {
      currentCountry = c;
      countryExists = true;
      break;
    }
  }

  if (countryExists) {
    currentCountry.results.push(newResult);
  }
  else {
    //if the country doesnt exist in the array, create a new one then push the result
    let newCountry: Country = new Country(countrySelect.options[countrySelect.selectedIndex].innerHTML);
    newCountry.results.push(newResult);
    countries.push(newCountry);
  }

  displayTable();
}

// This function refreshes the medal tally table
function displayTable() {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('results-body')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'results-body';

  for (let c of countries) {
    let newRow = newBody.insertRow();
    let cellCountry = newRow.insertCell(0);
    let cellGold = newRow.insertCell(1);
    let cellSilver = newRow.insertCell(2);
    let cellBronze = newRow.insertCell(3);
    let cellTotal = newRow.insertCell(4);

    //says not an array type but it works anyway?? compiler error? idk
    for (let cell of newRow.cells) {
      cell.id = c.name;
    }
    
    cellCountry.innerHTML = c.name;
    cellGold.innerHTML = c.totalMedalType(Medals.Gold).toString();
    cellSilver.innerHTML = c.totalMedalType(Medals.Silver).toString();
    cellBronze.innerHTML = c.totalMedalType(Medals.Bronze).toString();
    cellTotal.innerHTML = c.results.length.toString();
    
  }

  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}

function viewResults(event) {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(document.getElementById('countryResults-body'));
  let heading: HTMLElement = document.getElementById('country-h');
  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(document.createElement('tbody'));
  newBody.id = 'countryResults-body';

  let selectedCountry: Country;

  for (let c of countries) {
    if (event.target.id === c.name) {
      selectedCountry = c;
    }
  }
  heading.innerHTML = "Country: " + selectedCountry.name;

  for (let result of selectedCountry.results) {
    let newRow = newBody.insertRow();
    let cellSport = newRow.insertCell(0);
    let cellMedal = newRow.insertCell(1);

    cellSport.innerHTML = Sports[result.sport];
    cellMedal.innerHTML = result.medal;
  }

  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}
