async function barChart() {
	const width = document.querySelector('body').clientWidth
	const height = 500

	const margin = {
		top: 20,
		right: 30,
		bottom: 55,
		left: 70
	}

	const xScale = d3
		.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)
	const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top])

	let xAxis = d3.axisBottom(xScale)
	let yAxis = d3.axisLeft(yScale)

	const svg = d3.select('#barChart').attr('viewBox', [0, 0, width, height])

	d3.csv('countries.csv').then(data => {
		data.forEach(d => (d.population = +d.population))

		// console.log(data)

		xScale.domain(data.map(d => d.country))
		yScale.domain([0, d3.max(data, d => d.population)])

		svg
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			.attr('x', d => xScale(d.country))
			.attr('y', d => yScale(d.population))
			.attr('width', xScale.bandwidth())
			.attr('height', d => height - margin.bottom - yScale(d.population))

		svg
			.append('g')
			.attr('class', 'scale-label')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(xAxis)
			.selectAll('text')

		svg
			.append('g')
			.attr('class', 'scale-label')
			.attr('transform', `translate(${margin.left},0)`)
			.call(yAxis)
	})
}

barChart()
