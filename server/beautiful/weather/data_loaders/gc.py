import requests

STATION_INVENTORY_URL = 'ftp://ftp.tor.ec.gc.ca/Pub/Get_More_Data_Plus_de_donnees/Station%20Inventory%20EN.csv'


def load_stations():
    print requests.get(STATION_INVENTORY_URL).text