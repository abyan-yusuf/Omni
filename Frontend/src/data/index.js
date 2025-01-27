// Import JSON data directly
import divisions from './divisions.json';
import districts from './districts.json';
import thanas from './thanas.json';
// Function to get all divisions
export function getDivisions() {
    return divisions;
}

// Function to get districts by division ID
export function getDistrictsByDivision(division) {
    return districts.filter(district => district.division === division);
}

// Function to get upazilas by district ID
// Function to get areas by district ID
export function getThanasByDistrict (district) {
    return(thanas.filter(t => t.district === district)) ;
}