import {
  FETCH_STATIONS_SUCCESS
} from './actions'


const defaultState = [
  {
    "source": "GC",
    "name": "ALEXANDRIA",
    "station_id": "42003",
    "latitude": "45.320000000000",
    "longitude": "-74.610000000000"
},
{
    "source": "GC",
    "name": "ALFRED",
    "station_id": "4219",
    "latitude": "45.550000000000",
    "longitude": "-74.880000000000"
},
{
    "source": "GC",
    "name": "ALFRED AUTOMATIC CLIMATE STATION",
    "station_id": "4220",
    "latitude": "45.550000000000",
    "longitude": "-74.880000000000"
},
{
    "source": "GC",
    "name": "ALFRED",
    "station_id": "42006",
    "latitude": "45.560000000000",
    "longitude": "-74.880000000000"
},
{
    "source": "GC",
    "name": "ALMONTE",
    "station_id": "4221",
    "latitude": "45.180000000000",
    "longitude": "-76.230000000000"
},
{
    "source": "GC",
    "name": "APPLE HILL",
    "station_id": "4222",
    "latitude": "45.220000000000",
    "longitude": "-74.750000000000"
},
{
    "source": "GC",
    "name": "APPLETON",
    "station_id": "6901",
    "latitude": "45.190000000000",
    "longitude": "-76.110000000000"
},
{
    "source": "GC",
    "name": "ARDEN",
    "station_id": "4223",
    "latitude": "44.700000000000",
    "longitude": "-76.950000000000"
},
{
    "source": "GC",
    "name": "ARNPRIOR",
    "station_id": "4224",
    "latitude": "45.430000000000",
    "longitude": "-76.380000000000"
},
{
    "source": "GC",
    "name": "ARNPRIOR GRANDON",
    "station_id": "4225",
    "latitude": "45.420000000000",
    "longitude": "-76.370000000000"
},
{
    "source": "GC",
    "name": "ASHTON",
    "station_id": "4226",
    "latitude": "45.200000000000",
    "longitude": "-75.970000000000"
},
{
    "source": "GC",
    "name": "ASHTON STN SESIA FARM",
    "station_id": "4227",
    "latitude": "45.170000000000",
    "longitude": "-76.070000000000"
},
{
    "source": "GC",
    "name": "ATHENS",
    "station_id": "4228",
    "latitude": "44.650000000000",
    "longitude": "-75.920000000000"
},
{
    "source": "GC",
    "name": "AVONMORE",
    "station_id": "4229",
    "latitude": "45.170000000000",
    "longitude": "-74.970000000000"
},
{
    "source": "GC",
    "name": "BARK LAKE DAM",
    "station_id": "4230",
    "latitude": "45.420000000000",
    "longitude": "-77.800000000000"
},
{
    "source": "GC",
    "name": "BARRETT CHUTE",
    "station_id": "4231",
    "latitude": "45.250000000000",
    "longitude": "-76.770000000000"
},
{
    "source": "GC",
    "name": "BARRY'S BAY",
    "station_id": "4232",
    "latitude": "45.430000000000",
    "longitude": "-77.670000000000"
},
{
    "source": "GC",
    "name": "BELLROCK",
    "station_id": "4233",
    "latitude": "44.480000000000",
    "longitude": "-76.770000000000"
},
{
    "source": "GC",
    "name": "BELLS CORNERS",
    "station_id": "6952",
    "latitude": "45.330000000000",
    "longitude": "-75.820000000000"
},
{
    "source": "GC",
    "name": "BOURGET",
    "station_id": "4234",
    "latitude": "45.470000000000",
    "longitude": "-75.170000000000"
},
{
    "source": "GC",
    "name": "BROCKVILLE",
    "station_id": "4235",
    "latitude": "44.600000000000",
    "longitude": "-75.700000000000"
},
{
    "source": "GC",
    "name": "BROCKVILLE CLIMATE",
    "station_id": "47567",
    "latitude": "44.640000000000",
    "longitude": "-75.750000000000"
},
{
    "source": "GC",
    "name": "BROCKVILLE PCC",
    "station_id": "4236",
    "latitude": "44.600000000000",
    "longitude": "-75.670000000000"
},
{
    "source": "GC",
    "name": "CALABOGIE",
    "station_id": "4237",
    "latitude": "45.250000000000",
    "longitude": "-76.730000000000"
},
{
    "source": "GC",
    "name": "CARDINAL",
    "station_id": "4238",
    "latitude": "44.800000000000",
    "longitude": "-75.370000000000"
},
{
    "source": "GC",
    "name": "CARLETON PLACE",
    "station_id": "4239",
    "latitude": "45.150000000000",
    "longitude": "-76.170000000000"
},
{
    "source": "GC",
    "name": "CARLETON PLACE",
    "station_id": "4240",
    "latitude": "45.150000000000",
    "longitude": "-76.200000000000"
},
{
    "source": "GC",
    "name": "CARP",
    "station_id": "4241",
    "latitude": "45.300000000000",
    "longitude": "-75.980000000000"
},
{
    "source": "GC",
    "name": "CATARAQUI TS",
    "station_id": "4242",
    "latitude": "44.370000000000",
    "longitude": "-76.620000000000"
},
{
    "source": "GC",
    "name": "CHALK RIVER AECL",
    "station_id": "4243",
    "latitude": "46.050000000000",
    "longitude": "-77.370000000000"
},
{
    "source": "GC",
    "name": "CHATS FALLS",
    "station_id": "4244",
    "latitude": "45.470000000000",
    "longitude": "-76.230000000000"
},
{
    "source": "GC",
    "name": "CHENAUX",
    "station_id": "4245",
    "latitude": "45.580000000000",
    "longitude": "-76.680000000000"
},
{
    "source": "GC",
    "name": "CHESTERVILLE",
    "station_id": "4246",
    "latitude": "45.100000000000",
    "longitude": "-75.230000000000"
},
{
    "source": "GC",
    "name": "CHESTERVILLE 2",
    "station_id": "4247",
    "latitude": "45.020000000000",
    "longitude": "-75.200000000000"
},
{
    "source": "GC",
    "name": "CITY VIEW",
    "station_id": "4248",
    "latitude": "45.350000000000",
    "longitude": "-75.730000000000"
},
{
    "source": "GC",
    "name": "CLAYBANK",
    "station_id": "4249",
    "latitude": "45.420000000000",
    "longitude": "-76.400000000000"
},
{
    "source": "GC",
    "name": "CLONTARF",
    "station_id": "4250",
    "latitude": "45.380000000000",
    "longitude": "-77.150000000000"
},
{
    "source": "GC",
    "name": "COBDEN ONTARIO HYDRO",
    "station_id": "4251",
    "latitude": "45.630000000000",
    "longitude": "-76.870000000000"
},
{
    "source": "GC",
    "name": "COMBERMERE",
    "station_id": "4252",
    "latitude": "45.370000000000",
    "longitude": "-77.620000000000"
},
{
    "source": "GC",
    "name": "CORNWALL",
    "station_id": "4253",
    "latitude": "45.020000000000",
    "longitude": "-74.730000000000"
},
{
    "source": "GC",
    "name": "CORNWALL",
    "station_id": "4254",
    "latitude": "45.030000000000",
    "longitude": "-74.700000000000"
},
{
    "source": "GC",
    "name": "CORNWALL",
    "station_id": "4255",
    "latitude": "45.020000000000",
    "longitude": "-74.750000000000"
},
{
    "source": "GC",
    "name": "CORNWALL",
    "station_id": "42004",
    "latitude": "45.030000000000",
    "longitude": "-74.680000000000"
},
{
    "source": "GC",
    "name": "CORNWALL COLLEGE",
    "station_id": "4256",
    "latitude": "45.030000000000",
    "longitude": "-74.720000000000"
},
{
    "source": "GC",
    "name": "CORNWALL CUMBERLAND ST",
    "station_id": "4257",
    "latitude": "45.050000000000",
    "longitude": "-74.750000000000"
},
{
    "source": "GC",
    "name": "CORNWALL ONT HYDRO",
    "station_id": "4258",
    "latitude": "45.030000000000",
    "longitude": "-74.800000000000"
},
{
    "source": "GC",
    "name": "CORNWALL ST LHS",
    "station_id": "4259",
    "latitude": "45.030000000000",
    "longitude": "-74.720000000000"
},
{
    "source": "GC",
    "name": "CROW LAKE",
    "station_id": "4260",
    "latitude": "44.730000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "CUMBERLAND",
    "station_id": "4261",
    "latitude": "45.500000000000",
    "longitude": "-75.450000000000"
},
{
    "source": "GC",
    "name": "DACRE",
    "station_id": "4262",
    "latitude": "45.380000000000",
    "longitude": "-76.920000000000"
},
{
    "source": "GC",
    "name": "DALHOUSIE L HIGH FALLS",
    "station_id": "4263",
    "latitude": "44.970000000000",
    "longitude": "-76.620000000000"
},
{
    "source": "GC",
    "name": "DALHOUSIE MILLS",
    "station_id": "4264",
    "latitude": "45.320000000000",
    "longitude": "-74.470000000000"
},
{
    "source": "GC",
    "name": "DALKEITH",
    "station_id": "4265",
    "latitude": "45.430000000000",
    "longitude": "-74.620000000000"
},
{
    "source": "GC",
    "name": "DALKEITH PYM",
    "station_id": "4266",
    "latitude": "45.430000000000",
    "longitude": "-74.580000000000"
},
{
    "source": "GC",
    "name": "DELTA",
    "station_id": "4267",
    "latitude": "44.620000000000",
    "longitude": "-76.130000000000"
},
{
    "source": "GC",
    "name": "DES JOACHIMS",
    "station_id": "4269",
    "latitude": "46.180000000000",
    "longitude": "-77.700000000000"
},
{
    "source": "GC",
    "name": "DOMVILLE",
    "station_id": "4270",
    "latitude": "44.780000000000",
    "longitude": "-75.530000000000"
},
{
    "source": "GC",
    "name": "DUNROBIN",
    "station_id": "4271",
    "latitude": "45.430000000000",
    "longitude": "-76.030000000000"
},
{
    "source": "GC",
    "name": "DUNVEGAN",
    "station_id": "4272",
    "latitude": "45.330000000000",
    "longitude": "-74.780000000000"
},
{
    "source": "GC",
    "name": "EGANVILLE",
    "station_id": "4273",
    "latitude": "45.550000000000",
    "longitude": "-77.100000000000"
},
{
    "source": "GC",
    "name": "EGANVILLE 2",
    "station_id": "43600",
    "latitude": "45.550000000000",
    "longitude": "-77.100000000000"
},
{
    "source": "GC",
    "name": "FITZROY HARBOUR",
    "station_id": "4274",
    "latitude": "45.470000000000",
    "longitude": "-76.220000000000"
},
{
    "source": "GC",
    "name": "FOURNIER",
    "station_id": "4275",
    "latitude": "45.430000000000",
    "longitude": "-74.900000000000"
},
{
    "source": "GC",
    "name": "FOYMOUNT",
    "station_id": "4276",
    "latitude": "45.330000000000",
    "longitude": "-77.300000000000"
},
{
    "source": "GC",
    "name": "GANANOQUE",
    "station_id": "4277",
    "latitude": "44.320000000000",
    "longitude": "-76.200000000000"
},
{
    "source": "GC",
    "name": "GLENBURNIE",
    "station_id": "4278",
    "latitude": "44.330000000000",
    "longitude": "-76.500000000000"
},
{
    "source": "GC",
    "name": "GLEN GORDON",
    "station_id": "4279",
    "latitude": "45.170000000000",
    "longitude": "-74.530000000000"
},
{
    "source": "GC",
    "name": "GLOUCESTER DESJARDINS",
    "station_id": "4280",
    "latitude": "45.330000000000",
    "longitude": "-75.500000000000"
},
{
    "source": "GC",
    "name": "GLOUCESTER KETTLES",
    "station_id": "4281",
    "latitude": "45.350000000000",
    "longitude": "-75.550000000000"
},
{
    "source": "GC",
    "name": "GLOUCESTER RCN",
    "station_id": "4282",
    "latitude": "45.300000000000",
    "longitude": "-75.520000000000"
},
{
    "source": "GC",
    "name": "GLOUCESTER TINKER",
    "station_id": "4283",
    "latitude": "45.350000000000",
    "longitude": "-75.470000000000"
},
{
    "source": "GC",
    "name": "GODFREY",
    "station_id": "4284",
    "latitude": "44.570000000000",
    "longitude": "-76.630000000000"
},
{
    "source": "GC",
    "name": "DRUMMOND CENTRE",
    "station_id": "4268",
    "latitude": "45.030000000000",
    "longitude": "-76.250000000000"
},
{
    "source": "GC",
    "name": "GREENFIELD",
    "station_id": "4285",
    "latitude": "45.350000000000",
    "longitude": "-74.670000000000"
},
{
    "source": "GC",
    "name": "GRENADIER ISLAND",
    "station_id": "10903",
    "latitude": "44.420000000000",
    "longitude": "-75.850000000000"
},
{
    "source": "GC",
    "name": "HARROWSMITH BRACKEN",
    "station_id": "4286",
    "latitude": "44.380000000000",
    "longitude": "-76.700000000000"
},
{
    "source": "GC",
    "name": "HARTINGTON IHD",
    "station_id": "4287",
    "latitude": "44.430000000000",
    "longitude": "-76.690000000000"
},
{
    "source": "GC",
    "name": "HAWKESBURY",
    "station_id": "4288",
    "latitude": "45.620000000000",
    "longitude": "-74.630000000000"
},
{
    "source": "GC",
    "name": "HINCHINBROOKE",
    "station_id": "4289",
    "latitude": "44.580000000000",
    "longitude": "-76.680000000000"
},
{
    "source": "GC",
    "name": "IROQUOIS",
    "station_id": "10950",
    "latitude": "44.830000000000",
    "longitude": "-75.330000000000"
},
{
    "source": "GC",
    "name": "KEMPTVILLE",
    "station_id": "4291",
    "latitude": "45.000000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "KEMPTVILLE CS",
    "station_id": "27534",
    "latitude": "45.000000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "KILLALOE",
    "station_id": "4293",
    "latitude": "45.570000000000",
    "longitude": "-77.420000000000"
},
{
    "source": "GC",
    "name": "KINGSTON CLIMATE",
    "station_id": "47267",
    "latitude": "44.220000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "KINGSTON",
    "station_id": "4294",
    "latitude": "44.250000000000",
    "longitude": "-76.500000000000"
},
{
    "source": "GC",
    "name": "KINGSTON A",
    "station_id": "4295",
    "latitude": "44.220000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "KINGSTON BEVERLEY ST",
    "station_id": "4296",
    "latitude": "44.220000000000",
    "longitude": "-76.500000000000"
},
{
    "source": "GC",
    "name": "KINGSTON A",
    "station_id": "50428",
    "latitude": "44.230000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "KINGSTON A",
    "station_id": "52985",
    "latitude": "44.230000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "KINGSTON MARINE",
    "station_id": "4297",
    "latitude": "44.230000000000",
    "longitude": "-76.450000000000"
},
{
    "source": "GC",
    "name": "KINGSTON N & C GAS",
    "station_id": "4298",
    "latitude": "44.230000000000",
    "longitude": "-76.570000000000"
},
{
    "source": "GC",
    "name": "KINGSTON ONT HYDRO",
    "station_id": "4299",
    "latitude": "44.270000000000",
    "longitude": "-76.500000000000"
},
{
    "source": "GC",
    "name": "KINGSTON PUMPING STATION",
    "station_id": "4300",
    "latitude": "44.240000000000",
    "longitude": "-76.480000000000"
},
{
    "source": "GC",
    "name": "KINGSTON QUEENS U",
    "station_id": "4301",
    "latitude": "44.250000000000",
    "longitude": "-76.500000000000"
},
{
    "source": "GC",
    "name": "KILLALOE O'GRADY",
    "station_id": "4292",
    "latitude": "45.500000000000",
    "longitude": "-77.480000000000"
},
{
    "source": "GC",
    "name": "LAGGAN",
    "station_id": "4302",
    "latitude": "45.380000000000",
    "longitude": "-74.720000000000"
},
{
    "source": "GC",
    "name": "LANCASTER",
    "station_id": "4303",
    "latitude": "45.150000000000",
    "longitude": "-74.470000000000"
},
{
    "source": "GC",
    "name": "LANSDOWNE",
    "station_id": "4304",
    "latitude": "44.500000000000",
    "longitude": "-76.030000000000"
},
{
    "source": "GC",
    "name": "LANSDOWNE",
    "station_id": "4305",
    "latitude": "44.400000000000",
    "longitude": "-76.000000000000"
},
{
    "source": "GC",
    "name": "LEONARD",
    "station_id": "4306",
    "latitude": "45.380000000000",
    "longitude": "-75.320000000000"
},
{
    "source": "GC",
    "name": "LYN",
    "station_id": "4307",
    "latitude": "44.580000000000",
    "longitude": "-75.780000000000"
},
{
    "source": "GC",
    "name": "LYNDHURST SHAWMERE",
    "station_id": "4308",
    "latitude": "44.520000000000",
    "longitude": "-76.080000000000"
},
{
    "source": "GC",
    "name": "MACCUE",
    "station_id": "4309",
    "latitude": "44.880000000000",
    "longitude": "-76.170000000000"
},
{
    "source": "GC",
    "name": "MAITLAND",
    "station_id": "4310",
    "latitude": "44.630000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "MALLORYTOWN GRAHAM LAKE",
    "station_id": "4311",
    "latitude": "44.570000000000",
    "longitude": "-75.880000000000"
},
{
    "source": "GC",
    "name": "MALLORYTOWN LANDING",
    "station_id": "4312",
    "latitude": "44.450000000000",
    "longitude": "-75.870000000000"
},
{
    "source": "GC",
    "name": "MANOTICK",
    "station_id": "4313",
    "latitude": "45.230000000000",
    "longitude": "-75.680000000000"
},
{
    "source": "GC",
    "name": "MANOTICK",
    "station_id": "4314",
    "latitude": "45.230000000000",
    "longitude": "-75.700000000000"
},
{
    "source": "GC",
    "name": "KINGSTON (AUT)",
    "station_id": "7671",
    "latitude": "44.220000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "KILLALOE STATION",
    "station_id": "4290",
    "latitude": "45.480000000000",
    "longitude": "-77.500000000000"
},
{
    "source": "GC",
    "name": "MATAWATCHAN",
    "station_id": "4315",
    "latitude": "45.130000000000",
    "longitude": "-77.120000000000"
},
{
    "source": "GC",
    "name": "MERIVALE CDA",
    "station_id": "4316",
    "latitude": "45.300000000000",
    "longitude": "-75.730000000000"
},
{
    "source": "GC",
    "name": "METCALFE OSGOODE",
    "station_id": "4317",
    "latitude": "45.230000000000",
    "longitude": "-75.470000000000"
},
{
    "source": "GC",
    "name": "MONTAGUE",
    "station_id": "4318",
    "latitude": "44.930000000000",
    "longitude": "-75.950000000000"
},
{
    "source": "GC",
    "name": "MOOSE CREEK",
    "station_id": "4319",
    "latitude": "45.250000000000",
    "longitude": "-75.030000000000"
},
{
    "source": "GC",
    "name": "MOOSE CREEK WELLS",
    "station_id": "41738",
    "latitude": "45.250000000000",
    "longitude": "-74.960000000000"
},
{
    "source": "GC",
    "name": "MORRISBURG",
    "station_id": "4320",
    "latitude": "44.920000000000",
    "longitude": "-75.190000000000"
},
{
    "source": "GC",
    "name": "MOUNT ST PATRICK",
    "station_id": "4321",
    "latitude": "45.330000000000",
    "longitude": "-76.880000000000"
},
{
    "source": "GC",
    "name": "NAVAN",
    "station_id": "4322",
    "latitude": "45.430000000000",
    "longitude": "-75.520000000000"
},
{
    "source": "GC",
    "name": "NORTH AUGUSTA",
    "station_id": "4323",
    "latitude": "44.750000000000",
    "longitude": "-75.780000000000"
},
{
    "source": "GC",
    "name": "NORTH AUGUSTA MAHONEY",
    "station_id": "4324",
    "latitude": "44.730000000000",
    "longitude": "-75.730000000000"
},
{
    "source": "GC",
    "name": "NORTH GOWER",
    "station_id": "4325",
    "latitude": "45.130000000000",
    "longitude": "-75.720000000000"
},
{
    "source": "GC",
    "name": "NORTH GOWER",
    "station_id": "31028",
    "latitude": "45.100000000000",
    "longitude": "-75.740000000000"
},
{
    "source": "GC",
    "name": "OAK VALLEY",
    "station_id": "27614",
    "latitude": "45.000000000000",
    "longitude": "-75.370000000000"
},
{
    "source": "GC",
    "name": "OMPAH",
    "station_id": "26771",
    "latitude": "44.970000000000",
    "longitude": "-76.860000000000"
},
{
    "source": "GC",
    "name": "OMPAH-SEITZ",
    "station_id": "26773",
    "latitude": "45.050000000000",
    "longitude": "-76.780000000000"
},
{
    "source": "GC",
    "name": "ORLEANS VEH PRVG GND",
    "station_id": "4326",
    "latitude": "45.450000000000",
    "longitude": "-75.570000000000"
},
{
    "source": "GC",
    "name": "OTTAWA",
    "station_id": "4327",
    "latitude": "45.400000000000",
    "longitude": "-75.720000000000"
},
{
    "source": "GC",
    "name": "OTTAWA ALBION RD",
    "station_id": "4328",
    "latitude": "45.330000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "OTTAWA ALTA VISTA",
    "station_id": "4329",
    "latitude": "45.380000000000",
    "longitude": "-75.750000000000"
},
{
    "source": "GC",
    "name": "OTTAWA BECKWITH RD",
    "station_id": "4330",
    "latitude": "45.400000000000",
    "longitude": "-75.670000000000"
},
{
    "source": "GC",
    "name": "OTTAWA BILLINGS BRIDGE",
    "station_id": "4331",
    "latitude": "45.350000000000",
    "longitude": "-75.650000000000"
},
{
    "source": "GC",
    "name": "OTTAWA BRITANNIA",
    "station_id": "4332",
    "latitude": "45.370000000000",
    "longitude": "-75.800000000000"
},
{
    "source": "GC",
    "name": "OTTAWA CDA",
    "station_id": "4333",
    "latitude": "45.380000000000",
    "longitude": "-75.720000000000"
},
{
    "source": "GC",
    "name": "OTTAWA CDA RCS",
    "station_id": "30578",
    "latitude": "45.380000000000",
    "longitude": "-75.720000000000"
},
{
    "source": "GC",
    "name": "OTTAWA CITY HALL",
    "station_id": "4334",
    "latitude": "45.430000000000",
    "longitude": "-75.700000000000"
},
{
    "source": "GC",
    "name": "OTTAWA HAZELDEAN",
    "station_id": "4335",
    "latitude": "45.320000000000",
    "longitude": "-75.900000000000"
},
{
    "source": "GC",
    "name": "OTTAWA HOGS BACK",
    "station_id": "4336",
    "latitude": "45.370000000000",
    "longitude": "-75.680000000000"
},
{
    "source": "GC",
    "name": "OTTAWA MACDONALD-CARTIER INT'L A",
    "station_id": "4337",
    "latitude": "45.320000000000",
    "longitude": "-75.670000000000"
},
{
    "source": "GC",
    "name": "OTTAWA INTL A",
    "station_id": "49568",
    "latitude": "45.320000000000",
    "longitude": "-75.670000000000"
},
{
    "source": "GC",
    "name": "OTTAWA KANATA",
    "station_id": "4338",
    "latitude": "45.330000000000",
    "longitude": "-75.920000000000"
},
{
    "source": "GC",
    "name": "OTTAWA LA SALLE ACAD",
    "station_id": "4339",
    "latitude": "45.430000000000",
    "longitude": "-75.700000000000"
},
{
    "source": "GC",
    "name": "RIDEAU NARROWS LOCKS",
    "station_id": "26861",
    "latitude": "44.700000000000",
    "longitude": "-76.300000000000"
},
{
    "source": "GC",
    "name": "OTTAWA LEMIEUX ISLAND",
    "station_id": "4340",
    "latitude": "45.420000000000",
    "longitude": "-75.730000000000"
},
{
    "source": "GC",
    "name": "OTTAWA NEPEAN",
    "station_id": "4341",
    "latitude": "45.380000000000",
    "longitude": "-75.750000000000"
},
{
    "source": "GC",
    "name": "OTTAWA NRC",
    "station_id": "4342",
    "latitude": "45.450000000000",
    "longitude": "-75.620000000000"
},
{
    "source": "GC",
    "name": "OTTAWA RIDEAU WARD",
    "station_id": "4343",
    "latitude": "45.400000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "OTTAWA ROCKCLIFFE A",
    "station_id": "4344",
    "latitude": "45.450000000000",
    "longitude": "-75.630000000000"
},
{
    "source": "GC",
    "name": "OTTAWA SOUTH MARCH",
    "station_id": "4345",
    "latitude": "45.350000000000",
    "longitude": "-75.930000000000"
},
{
    "source": "GC",
    "name": "OTTAWA STOLPORT A",
    "station_id": "7684",
    "latitude": "45.470000000000",
    "longitude": "-75.650000000000"
},
{
    "source": "GC",
    "name": "OTTAWA U OF O",
    "station_id": "4346",
    "latitude": "45.420000000000",
    "longitude": "-75.680000000000"
},
{
    "source": "GC",
    "name": "OUTLET",
    "station_id": "4347",
    "latitude": "44.480000000000",
    "longitude": "-76.050000000000"
},
{
    "source": "GC",
    "name": "PEMBROKE EDDY MATCH",
    "station_id": "4348",
    "latitude": "45.830000000000",
    "longitude": "-77.150000000000"
},
{
    "source": "GC",
    "name": "PEMBROKE FORESTRY STN",
    "station_id": "4349",
    "latitude": "45.800000000000",
    "longitude": "-77.180000000000"
},
{
    "source": "GC",
    "name": "PEMBROKE CLIMATE",
    "station_id": "49068",
    "latitude": "45.860000000000",
    "longitude": "-77.250000000000"
},
{
    "source": "GC",
    "name": "PEMBROKE SE",
    "station_id": "31127",
    "latitude": "45.750000000000",
    "longitude": "-76.980000000000"
},
{
    "source": "GC",
    "name": "PERCH LAKE MAIN IHD",
    "station_id": "4350",
    "latitude": "46.070000000000",
    "longitude": "-77.630000000000"
},
{
    "source": "GC",
    "name": "PERTH ONTARIO HYDRO",
    "station_id": "4351",
    "latitude": "44.920000000000",
    "longitude": "-76.270000000000"
},
{
    "source": "GC",
    "name": "PETAWAWA AWOS 2",
    "station_id": "47527",
    "latitude": "45.950000000000",
    "longitude": "-77.320000000000"
},
{
    "source": "GC",
    "name": "PETAWAWA A",
    "station_id": "4352",
    "latitude": "45.950000000000",
    "longitude": "-77.320000000000"
},
{
    "source": "GC",
    "name": "PETAWAWA NAT FORESTRY",
    "station_id": "4353",
    "latitude": "45.980000000000",
    "longitude": "-77.430000000000"
},
{
    "source": "GC",
    "name": "PORT ELMSLEY",
    "station_id": "4354",
    "latitude": "44.880000000000",
    "longitude": "-76.130000000000"
},
{
    "source": "GC",
    "name": "PORTLAND",
    "station_id": "4355",
    "latitude": "44.700000000000",
    "longitude": "-76.200000000000"
},
{
    "source": "GC",
    "name": "PURDY",
    "station_id": "4356",
    "latitude": "45.320000000000",
    "longitude": "-77.720000000000"
},
{
    "source": "GC",
    "name": "RAMSAYVILLE CRF",
    "station_id": "4357",
    "latitude": "45.420000000000",
    "longitude": "-75.550000000000"
},
{
    "source": "GC",
    "name": "RENFREW",
    "station_id": "4359",
    "latitude": "45.480000000000",
    "longitude": "-76.700000000000"
},
{
    "source": "GC",
    "name": "RENFREW",
    "station_id": "4360",
    "latitude": "45.430000000000",
    "longitude": "-76.650000000000"
},
{
    "source": "GC",
    "name": "RENFREW SAND POINT",
    "station_id": "4361",
    "latitude": "45.480000000000",
    "longitude": "-76.430000000000"
},
{
    "source": "GC",
    "name": "RICHMOND",
    "station_id": "4362",
    "latitude": "45.170000000000",
    "longitude": "-75.780000000000"
},
{
    "source": "GC",
    "name": "RICHMOND",
    "station_id": "4363",
    "latitude": "45.180000000000",
    "longitude": "-75.850000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL BOBS LAKE",
    "station_id": "4364",
    "latitude": "44.730000000000",
    "longitude": "-76.600000000000"
},
{
    "source": "GC",
    "name": "RIDEAU C BURRITS RAPIDS",
    "station_id": "4365",
    "latitude": "44.980000000000",
    "longitude": "-75.800000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL JONES FALLS",
    "station_id": "4366",
    "latitude": "44.550000000000",
    "longitude": "-76.230000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL KILMARNOCK",
    "station_id": "4367",
    "latitude": "44.880000000000",
    "longitude": "-75.930000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL LONG ISLAND",
    "station_id": "4368",
    "latitude": "45.250000000000",
    "longitude": "-75.700000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL NARROWS",
    "station_id": "4369",
    "latitude": "44.700000000000",
    "longitude": "-76.300000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL PERTH",
    "station_id": "4370",
    "latitude": "44.900000000000",
    "longitude": "-76.250000000000"
},
{
    "source": "GC",
    "name": "RICHMOND",
    "station_id": "4358",
    "latitude": "45.150000000000",
    "longitude": "-75.900000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL UPP BREWERS",
    "station_id": "4371",
    "latitude": "44.420000000000",
    "longitude": "-76.320000000000"
},
{
    "source": "GC",
    "name": "RIDEAU CANAL WOLFE LAKE",
    "station_id": "4372",
    "latitude": "44.600000000000",
    "longitude": "-76.400000000000"
},
{
    "source": "GC",
    "name": "RIDEAU FERRY",
    "station_id": "4373",
    "latitude": "44.850000000000",
    "longitude": "-76.150000000000"
},
{
    "source": "GC",
    "name": "ROLPHTON",
    "station_id": "4374",
    "latitude": "46.180000000000",
    "longitude": "-77.650000000000"
},
{
    "source": "GC",
    "name": "ROLPHTON NPD",
    "station_id": "4375",
    "latitude": "46.180000000000",
    "longitude": "-77.670000000000"
},
{
    "source": "GC",
    "name": "RUSSELL",
    "station_id": "4376",
    "latitude": "45.260000000000",
    "longitude": "-75.360000000000"
},
{
    "source": "GC",
    "name": "ST. ALBERT",
    "station_id": "4377",
    "latitude": "45.290000000000",
    "longitude": "-75.060000000000"
},
{
    "source": "GC",
    "name": "ST ELMO",
    "station_id": "4378",
    "latitude": "45.320000000000",
    "longitude": "-74.850000000000"
},
{
    "source": "GC",
    "name": "ST RAPHAEL",
    "station_id": "4379",
    "latitude": "45.220000000000",
    "longitude": "-74.580000000000"
},
{
    "source": "GC",
    "name": "SANDHURST",
    "station_id": "6902",
    "latitude": "44.130000000000",
    "longitude": "-76.880000000000"
},
{
    "source": "GC",
    "name": "SARSFIELD",
    "station_id": "4380",
    "latitude": "45.430000000000",
    "longitude": "-75.350000000000"
},
{
    "source": "GC",
    "name": "SHIRLEY BAY",
    "station_id": "4381",
    "latitude": "45.350000000000",
    "longitude": "-75.880000000000"
},
{
    "source": "GC",
    "name": "SMITHS FALLS",
    "station_id": "4382",
    "latitude": "44.920000000000",
    "longitude": "-76.050000000000"
},
{
    "source": "GC",
    "name": "SMITHS FALLS WPCP",
    "station_id": "4383",
    "latitude": "44.900000000000",
    "longitude": "-76.000000000000"
},
{
    "source": "GC",
    "name": "SMITHS FALLS TS",
    "station_id": "4384",
    "latitude": "44.880000000000",
    "longitude": "-76.000000000000"
},
]

export default function stationReducer(state=defaultState, action){
  switch(action.type){
    case FETCH_STATIONS_SUCCESS: 
      return action.payload
    default:
      return state;
  }
}
