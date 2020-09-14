!function () {
	var DonutItem = {};
	var DonutConfig = {};

	var key = function (d) { return d.data.label; };
	var midAngle = function (d) {return d.startAngle + (d.endAngle - d.startAngle) / 2; }


	DonutItem.create = function (id, data, width, height) {
		DonutConfig[id] = {};
		DonutConfig[id]['width'] = width;
		DonutConfig[id]['height'] = height;
		var radius = Math.min(width, height) / 2;

		var svg = d3.select('#' + id)
			.append("svg").attr('id', id + '-svg')
			.append("g");

		svg.append("g").attr("class", "slices");
		svg.append("g").attr("class", "labels");
		svg.append("g").attr("class", "lines");

		svg.attr("transform", "translate(" + (width / 2 + 10) + "," + height / 2 + ")");

		DonutConfig[id]['pie'] = d3.layout.pie().sort(null).value(function (d) {
			return d.value;
		});

		DonutConfig[id]['arc'] = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);

		DonutConfig[id]['outerArc'] = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

		DonutConfig[id]['svg'] = svg;
		DonutConfig[id]['radius'] = radius;

		this.redraw(id, data);
	}

	DonutItem.redraw = function (id, data) {
		var svg = DonutConfig[id]['svg'];
		var pie = DonutConfig[id]['pie'];
		var radius = DonutConfig[id]['radius'];
		var arc = DonutConfig[id]['arc'];
		var outerArc = DonutConfig[id]['outerArc'];

		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice")
			.data(pie(data), key);

		slice.enter().insert("path").style("fill", function (d) { return d.data.color; })
			.attr("class", "slice");

		slice.transition().duration(1000).attrTween("d", function (d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function (t) {
				return arc(interpolate(t));
			};
		})

		slice.exit().remove();

		/* ------- TEXT LABELS -------*/

		var text = svg.select(".labels").selectAll("text")
			.data(pie(data), key);

			text.enter()
			.append("text")
			.attr("dy", ".35em")
			.html(function (d) {
				 return '<a style="fill: #f15c2e" href="' + d.data.href +  '" >' +  d.data.label + d.data.percent + " </a>";
			});

			text.transition().duration(1000).attrTween("transform", function (d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function (t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
					return "translate(" + pos + ")";
				};
			})
			.styleTween("text-anchor", function (d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function (t) {
					var d2 = interpolate(t);
					return midAngle(d2) < Math.PI ? "start" : "end";
				};
			});

		text.exit().remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = svg.select(".lines").selectAll("polyline")
			.data(pie(data), key);

		polyline.enter().append("polyline");

		polyline.transition().duration(1000).attrTween("points", function (d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function (t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
					return [arc.centroid(d2), outerArc.centroid(d2), pos];
				};
			});

		polyline.exit().remove();
	}

	this.DonutItem = DonutItem;
}();
