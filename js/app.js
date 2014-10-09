queue()
    .defer(d3.tsv, 'data/data.tsv') // our data
//  .defer(d3.json, 'cities.json') // geojson points
    .await(buildCharts);

function buildCharts(err, data) {
  items = crossfilter(data);

  group_dim = items.dimension(_.property('group'));
  group_total = group_dim.group().reduceSum(_.property('coffees'));

  name_dim = items.dimension(function(d) { return d.name; });
  name_total = name_dim.group().reduceSum(function(d) {return d.coffees});

  group_chart = dc.pieChart('#group_chart')
    .width(100)
    .height(100)
    .innerRadius(30)
    .dimension(group_dim)
    .group(group_total)

  name_chart = dc.rowChart('#name_chart')
    .width(400)
    .height(150)
    .dimension(name_dim)
    .group(name_total)

  dc.renderAll();
}