// Import JSON data directly
import divisions from './data/divisions.json';
import districts from './data/districts.json';
import districtArea from './data/2.json';
// Function to get all divisions
export function getDivisions() {
    return divisions;
}

// Function to get districts by division ID
export function getDistrictsByDivision(divisionId) {
    return districts.filter(district => district.division_id === divisionId);
}

// Function to get upazilas by district ID
// Function to get areas by district ID
export function getAreasByDistrict(district) {
    return(districtArea.filter(area => area.district === district)[0].areas) ;
}