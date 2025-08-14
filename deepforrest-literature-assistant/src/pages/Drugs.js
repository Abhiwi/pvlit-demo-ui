import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

const Drugs = () => {
  const navigate = useNavigate();
  const [drugsData, setDrugsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [uniqueDrugs, setUniqueDrugs] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDrugsData = async () => {
      try {
        const token = document.cookie.split('user=')[1]?.split(';')[0];
        const response = await fetch('/api/drugs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched drugs data:', data);
        setDrugsData(data);

        const drugs = [...new Set(data.map(item => item.drug).filter(drug => drug && drug.trim()))];
        console.log('Unique drugs:', drugs);
        setUniqueDrugs(drugs.sort());
      } catch (error) {
        console.error('Error fetching drugs data:', error);
      }
    };
    fetchDrugsData();
  }, []);

  useEffect(() => {
    console.log('useEffect triggered with selectedDrug:', selectedDrug);
    if (drugsData.length > 0 && chartRef.current) {
      renderBarChart();
    }
  }, [drugsData, selectedDrug]);

  const renderBarChart = () => {
    d3.select(chartRef.current).selectAll("*").remove();

    const margin = { top: 60, right: 40, bottom: 80, left: 70 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)")
      .style("border-radius", "12px")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const categories = ['ICSR', 'AOI'];
    const filteredData = selectedDrug
      ? drugsData.filter(item => item.drug.trim().toLowerCase() === selectedDrug.trim().toLowerCase())
      : drugsData;
    console.log('Filtered data for', selectedDrug || 'all drugs:', filteredData);
    const counts = categories.map(cat =>
      filteredData.filter(item => item.category === cat).length
    );
    console.log('Chart counts:', counts);

    const x = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(counts) * 1.3 || 10])
      .nice()
      .range([height, 0]);

    // Add gradient definitions for bars
    const defs = svg.append("defs");
    
    const icsrGradient = defs.append("linearGradient")
      .attr("id", "icsrGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", height)
      .attr("x2", 0).attr("y2", 0);

    icsrGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1483F8");

    icsrGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3b82f6");

    const aoiGradient = defs.append("linearGradient")
      .attr("id", "aoiGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", height)
      .attr("x2", 0).attr("y2", 0);

    aoiGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#10b981");

    aoiGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#34d399");

    // Add shadow filter
    const shadow = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");

    shadow.append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 4)
      .attr("stdDeviation", 3)
      .attr("flood-color", "rgba(0, 0, 0, 0.1)");

    // Create bars with animations
    const bars = svg.selectAll(".bar")
      .data(counts)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(categories[i]))
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => i === 0 ? "url(#icsrGradient)" : "url(#aoiGradient)")
      .attr("rx", 8)
      .attr("ry", 8)
      .style("cursor", "pointer")
      .style("filter", "url(#drop-shadow)")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "scale(1.05)")
          .style("filter", "url(#drop-shadow) brightness(1.1)");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "scale(1)")
          .style("filter", "url(#drop-shadow)");
      });

    // Animate bars
    bars.transition()
      .duration(1000)
      .ease(d3.easeBounceOut)
      .attr("y", d => y(d))
      .attr("height", d => Math.max(1, height - y(d)));

    // Add value labels with animation
    const labels = svg.selectAll(".bar-label")
      .data(counts)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d, i) => x(categories[i]) + x.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "700")
      .style("fill", "#1f2937")
      .style("text-shadow", "0 1px 2px rgba(255, 255, 255, 0.8)")
      .text(d => d);

    labels.transition()
      .duration(1000)
      .delay(500)
      .ease(d3.easeBackOut)
      .attr("y", d => y(d) - 12);

    // Enhanced grid lines
    svg.selectAll(".grid-line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .style("stroke", "#e2e8f0")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.7);

    // Enhanced X-axis
    const xAxis = svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .style("font-family", "Inter, system-ui, sans-serif");

    xAxis.selectAll("text")
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .attr("dy", "1.2em");

    xAxis.selectAll(".domain")
      .style("stroke", "#d1d5db")
      .style("stroke-width", 2);

    // Enhanced Y-axis
    const yAxis = svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d3.format("d")).tickSize(-width))
      .style("font-family", "Inter, system-ui, sans-serif");

    yAxis.selectAll("text")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .style("fill", "#6b7280");

    yAxis.selectAll(".domain")
      .style("stroke", "#d1d5db")
      .style("stroke-width", 2);

    yAxis.selectAll(".tick line")
      .style("stroke", "#e2e8f0")
      .style("stroke-dasharray", "2,2")
      .style("opacity", 0.6);

    // Enhanced X-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2},${height + 60})`)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .style("font-family", "Inter, system-ui, sans-serif")
      .text("Categories");

    // Enhanced Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .style("font-family", "Inter, system-ui, sans-serif")
      .text("Count");

    // Enhanced title with animation
    const title = svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-weight", "700")
      .style("fill", "#111827")
      .style("font-family", "Inter, system-ui, sans-serif")
      .style("opacity", 0)
      .text(`ICSR/AOI Distribution${selectedDrug ? ` for ${selectedDrug}` : ''}`);

    title.transition()
      .duration(800)
      .style("opacity", 1);

    // Add category icons/badges
    svg.selectAll(".category-badge")
      .data(categories)
      .enter()
      .append("circle")
      .attr("class", "category-badge")
      .attr("cx", (d, i) => x(categories[i]) + x.bandwidth() / 2)
      .attr("cy", height + 25)
      .attr("r", 6)
      .attr("fill", (d, i) => i === 0 ? "#1483F8" : "#10b981")
      .style("opacity", 0)
      .transition()
      .duration(1200)
      .delay(300)
      .style("opacity", 1);
  };

  const filteredDrugs = uniqueDrugs.filter(drug =>
    drug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ICSR and AOI Data Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore drug safety data distribution across Individual Case Safety Reports (ICSR) and Aggregate Other Information (AOI) categories
          </p>
        </div>

        {/* Drug Selection Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12 backdrop-blur-sm bg-white/90">
          <div className="flex items-center mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-900">Drug Selection</h2>
          </div>
          
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Drug for Analysis
            </label>
            <select
              key={selectedDrug}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-white shadow-sm text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
              value={selectedDrug}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log('Select event value:', newValue);
                if (newValue === '') {
                  console.log('Reset to All Drugs');
                } else {
                  console.log('Selected drug:', newValue);
                }
                setSelectedDrug(newValue);
                setSearchTerm(newValue);
              }}
            >
              <option value="">🔍 All Drugs (Combined Analysis)</option>
              {uniqueDrugs.map(drug => (
                <option key={drug} value={drug}>💊 {drug}</option>
              ))}
            </select>
          </div>
          
          {selectedDrug && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-700">
                Analyzing: <strong>{selectedDrug}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-900">Data Visualization</h2>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-2"></div>
                <span className="font-medium text-gray-600">ICSR</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 mr-2"></div>
                <span className="font-medium text-gray-600">AOI</span>
              </div>
            </div>
          </div>
          
          <div ref={chartRef} className="w-full flex justify-center min-h-[450px] items-center"></div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">ICSR Reports</h3>
            </div>
            <p className="text-gray-600">An Individual Case Safety Report (ICSR) is a detailed record of an adverse event associated with the use of a medical product.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">AOI Data</h3>
            </div>
            <p className="text-gray-600">An Area of Interest (AOI) highlights specific topics, conditions, or events being monitored or analyzed for relevance and impact.</p>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Drugs;