const results = [
  {
    Description: 'GHS 2,436,000.00 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 4 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 4 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t selling \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 4 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 70 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 120 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t Meters \t\t\t\t\t\n' +
      '\t\t\t\t\t\t4 BEDROOMS STORY BUILDING FOR SALE AROUND TRASACCO (PHASE 2)With dining hall, living room very spacious, very big kitchen, all rooms ensuit and spacious with inbuilt wardrobes, visitors washroom, very very big master bedroom ensuit, borehole, electric fence, 24hrs flow of treated water, garage, plot sizes 70/120, compound beautifully tilled and spacious. Going for ($420,000 negotiable)\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t\tTrassaco Valley Estates\t\t\t\t\t\n' +
      '\t\t\t\t\t\tGreater Accra\t\t\t\t\t\n' +
      '\t\t\t\t\t\t.\t\t\t\t\t\n' +
      '\t\t\t\t\t\tBenjamin  Annan\t\t\t\t\t\n' +
      '\t\t\t\t\t\t0548630221\t\t\t\t\t\n' +
      '\t\t\t\t\t\tPrivate Listing',
    Title: 'Four Bedroom Story For Sale'
  },
  {
    Description: 'GHS 450,000.00 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 2 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 2 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t selling \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 2 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 50 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 72 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t Feet \t\t\t\t\t\n' +
      '\t\t\t\t\t\tJUST COMPLETED TWO SOLID CONCRETE HOUSES AT AMASAMAN NEAR THREE JUNCTION. EACH HOUSE CONTAINS 2 BEDROOM, HALL KITCHEN, DINNING, BIG PARKING SPACE ETC. EACH OF THE HOUSES COST GHC 450,000\n' +
      ' \n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t\tAmasaman\t\t\t\t\t\n' +
      '\t\t\t\t\t\tGreater Accra\t\t\t\t\t\n' +
      '\t\t\t\t\t\tThree junction\t\t\t\t\t\n' +
      '\t\t\t\t\t\tLamptey\t\t\t\t\t\n' +
      '\t\t\t\t\t\t0244820588\t\t\t\t\t\n' +
      '\t\t\t\t\t\tPrivate Listing',
    Title: 'Just Completed 2 Houses For Sale'
  },
  {
    Description: 'GHS 250.00 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 2 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 1 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t renting \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 1 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 100 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 100 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t Feet \t\t\t\t\t\n' +
      '\t\t\t\t\t\t1 bedroom ,Hall,Kitchen,Washroom, Gated and secured area  of 1 year\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t\tSpintex\t\t\t\t\t\n' +
      '\t\t\t\t\t\tGreater Accra\t\t\t\t\t\n' +
      '\t\t\t\t\t\t18 junction\t\t\t\t\t\n' +
      '\t\t\t\t\t\tDino\t\t\t\t\t\n' +
      '\t\t\t\t\t\t0275230804\t\t\t\t\t\n' +
      '\t\t\t\t\t\tPrivate Listing',
    Title: 'Chamber & Hall  S.C For Rent'
  },
  {
    Description: 'GHS 5,900.00 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 3 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 3 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t selling \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 3 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 70 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 80 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t Feet \t\t\t\t\t\n' +
      '\t\t\t\t\t\t3 Bedrooms Houses for Sale at Adjiringanor-Easl legon in Gated community Galaxy international.It is located in a serene environment with access to good Tarred road networks, All rooms have air-conditioning,electricity, portable drinking water, hospitals ,schools, shops and many other social amenities.Living Room and dining area -Well fitted kitchen, Secured walled and Gated with good Safety Securities for 24 Hours.\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t\tEast Legon\t\t\t\t\t\n' +
      '\t\t\t\t\t\tGreater Accra\t\t\t\t\t\n' +
      '\t\t\t\t\t\tCommunity9,Tema\t\t\t\t\t\n' +
      '\t\t\t\t\t\tAlbert Tetteh Okpenor Properties Agency.\t\t\t\t\t\n' +
      '\t\t\t\t\t\t+233244626457 / +233208954645/+233577530224\t\t\t\t\t\n' +
      '\t\t\t\t\t\tPrivate Listing',
    Title: '3 Bedrooms House For Sale At Adjiringanor-East Legon'
  },
  {
    Description: 'GHS 490,000.00 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 3 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 3 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t selling \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 2 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 80 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t 70 \t\t\t\t\t\n' +
      '\t\t\t\t\t\t Feet \t\t\t\t\t\n' +
      "\t\t\t\t\t\tBeautiful 3Bedrooms House for Sale in Devtraco Estate at Tema community25.Devtraco is a master planned gated community suitable for busy professionals,expatriates and working families with a busy lifestyle. Facilities and amenities include: 24/7 security, excellent road network, with tarred roads, underground drainage,Shopping Mall, Fire and Police station, Water Park and Children's Park,Recreational Area, Clubhouse etc.The house features 3 bedrooms (one master), a second bathroom, hall and dining area, kitchen and private compound with parking available for 3 cars.Convenient location with direct access to Accra, Tema Township, Dawhenya, Prampram and Aflao.The price is $90,000 usd.Accra Kotoka International Airport is just 30 minutes Drive.\n" +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t\tTema\t\t\t\t\t\n' +
      '\t\t\t\t\t\tGreater Accra\t\t\t\t\t\n' +
      '\t\t\t\t\t\tCommunity9,Tema\t\t\t\t\t\n' +
      '\t\t\t\t\t\tAlbert Tetteh Okpenor Properties Agency.\t\t\t\t\t\n' +
      '\t\t\t\t\t\t+233244626457 / +233208954645/+233577530224\t\t\t\t\t\n' +
      '\t\t\t\t\t\tPrivate Listing',
    Title: '3 Bedrooms House For Sale In Devtraco Estate At Tema Com 25'
  }
];

module.exports = results;