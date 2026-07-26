// Real GeoJSON (RFC 7946) data for every campus location.
// Loaded by script.js, which converts it into the flat `locations` array
// the rest of the UI code already works with.
const CAMPUS_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 0,
        "name": "University Library"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598735511805239,
          12.942189126715368
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "name": "AUK Labs (Physics, Chem, Bio, Micro, SLT)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597262497054059,
          12.944025423413379
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "name": "Gidan Hausa"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.5984198478861735,
          12.94458605228857
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 3,
        "name": "Senate Building"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598917366584141,
          12.944144435496021
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 4,
        "name": "Block J (College of Education - Computer Education, Chemistry Education, Biology Education, Physics Education, Mathematics Education, Economics Education, Accounting Education & Other Related Education Courses)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598894171197383,
          12.940634205905074
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 5,
        "name": "School Mosque"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.5998797180143445,
          12.943030410921988
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 6,
        "name": "Football Field"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.601588435960898,
          12.945415895404928
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 7,
        "name": "Mosque Toilet"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.599802503573592,
          12.942614736662177
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 8,
        "name": "Humanities Studies Block H (College of Humanities - Arabic Studies, English Language, Hausa, Islamic Studies, Sharia)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598736968045122,
          12.941172322817021
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 9,
        "name": "School Clinic"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598802168841364,
          12.940196653242213
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 10,
        "name": "Kwankassiya Hostel"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.595565188093713,
          12.94108204302298
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 11,
        "name": "Main Campus Gate (Gate 1)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.602090968160514,
          12.944396634645443
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 12,
        "name": "Second Campus Gate (Gate 2)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.599161391179505,
          12.940015825957566
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 13,
        "name": "Basketball Field"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.600699993744524,
          12.944999374007404
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 14,
        "name": "Long Tennis Field"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.600078053045236,
          12.945018683190654
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 15,
        "name": "Biological Garden"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.601229524727266,
          12.943278839383343
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 16,
        "name": "SLT Department Block B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598636203885681,
          12.942885128855721
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 17,
        "name": "Nursing Science Lecture Halls"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.595906119003388,
          12.94222176545315
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 18,
        "name": "SLT Lecture Halls"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.596297554589543,
          12.942744663256484
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 19,
        "name": "Katsina Islamic Foundation"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.602044088564637,
          12.943685583219317
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 20,
        "name": "Student Affairs Division"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598247284787104,
          12.942853562123661
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 21,
        "name": "Sitting Area"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597308510625994,
          12.943407872589265
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 22,
        "name": "Adebayoro Garki Hall"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.595832214855692,
          12.943114728861902
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 23,
        "name": "Multipurpose Hall"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.599181720180506,
          12.944885038423415
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 24,
        "name": "Ado Bayero Office Complex (College of Allied Health Science - B.NSc. Nursing Science, B.Rad. Radiography, Human Nutrition and Dietetics, Physiotherapy, Public Health)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.596914775158526,
          12.943017922678324
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 25,
        "name": "Block E Natural and Applied Sciences (Biochemistry, Biology, Mathematics, Physics)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597341218718768,
          12.942813145141784
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 26,
        "name": "Microbiology Department"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.59589310247342,
          12.944068676138636
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 27,
        "name": "Staff Quarters"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.599752042892087,
          12.940450829060243
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 28,
        "name": "Public Toilet"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.596160222404254,
          12.942984332317081
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 29,
        "name": "Auditorium (College of Computing and Information Sciences - Computer Science, Cyber Security, Information Technology, Software Engineering)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597469999850925,
          12.942453695528258
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 30,
        "name": "Block A (Sociology & Political Science)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.598722699582997,
          12.943220587844976
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 31,
        "name": "Block C (Economics & Business Admin)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597948799948998,
          12.943187972941669
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 32,
        "name": "Cafeteria"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.599808969037279,
          12.942257479986655
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 33,
        "name": "ICT Center"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.6000880867600165,
          12.941691688244195
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 34,
        "name": "Block D (Accounting)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597282388030624,
          12.943093722369916
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 35,
        "name": "AUK Girls Hostel"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597553678440891,
          12.941222994885825
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 36,
        "name": "Block F (Public Administration)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.597852319171638,
          12.942758151033939
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 37,
        "name": "Office for General Studies (GSP 101 – Use of English I; GSP 102 – Use of English; GSP 103 – Nigerian Peoples and Culture; GSP 104 – Philosophy, Logic and Human Existence; GSP 105 – Natural Science I; GSP 106 – Natural Science II; GSP 107 – Computer Fundamentals / ICT; GSP 108 – Use of Library, Study Skills & ICT; ENT 211 – Entrepreneurship and Innovation; ENT 312 – Venture Creation)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.595595858579311,
          12.942570018020104
        ]
      }
    }
  ]
};
