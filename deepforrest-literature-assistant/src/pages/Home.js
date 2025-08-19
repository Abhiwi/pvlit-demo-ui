// // // // // /original/ 
// // // // import React, { useEffect, useState, useRef, useMemo } from 'react';
// // // // import { Activity, FileText, AlertCircle, TrendingUp, Users, ArrowRight, Droplet, Zap } from 'lucide-react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import DatabaseService from '../services/DatabaseService';
// // // // import * as d3 from 'd3';

// // // // const Home = () => {
// // // //   const navigate = useNavigate();
// // // //   const [stats, setStats] = useState({
// // // //     eMailCount: 0,
// // // //     articleCount: 0,
// // // //     icsrAoiCount: 0
// // // //   });
  
// // // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // // //   const [casualityData, setcasualityData] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isChartRendered, setIsChartRendered] = useState(false);
  
// // // //   // Refs for chart containers
// // // //   const patientTypeChartRef = useRef(null);
// // // //   const casualityChartRef = useRef(null);
  
// // // //   // Color palette with blue and sea green shades (with more contrast between colors)
// // // //   const COLORS = useMemo(() => [
// // // //     '#0ea5e9', // bright blue
// // // //     '#0891b2', // cyan
// // // //     '#0e766e', // teal
// // // //     '#0d9488', // teal light
// // // //     '#14b8a6', // sea green
// // // //     '#06b6d4', // sky blue
// // // //   ], []);
  
// // // //   const MAIN_COLOR = '#0ea5e9';     // bright blue
// // // //   const SECONDARY_COLOR = '#0d9488'; // teal
// // // //   const DARK_COLOR = '#0f172a';     // slate-900
// // // //   const LIGHT_BG = '#f0f9ff';       // sky-50

// // // //   useEffect(() => {
// // // //     fetchDashboardData();
    
// // // //     // Add entrance animation for elements
// // // //     const timer = setTimeout(() => {
// // // //       setIsChartRendered(true);
// // // //     }, 300);
    
// // // //     return () => clearTimeout(timer);
// // // //   }, []);

// // // //   // Effect to render charts when data is loaded
// // // //   useEffect(() => {
// // // //     if (!loading && patientTypeData.length > 0 && isChartRendered) {
// // // //       renderPatientTypeChart();
// // // //       rendercasualityChart();
// // // //     }
// // // //   }, [loading, patientTypeData, casualityData, isChartRendered, COLORS]);

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       // Fetch literature data using the same service as in LiteratureReviewContent
// // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // //       // Calculate stats
// // // //       const uniqueEMails = new Set();
// // // //       let icsrAoiCount = 0;
      
// // // //       // Patient Type tracking
// // // //       const patientTypeCounts = {
// // // //         'Human': 0,
// // // //         'Animal': 0,
// // // //         'Study': 0,
// // // //         'Analysis': 0,
// // // //         'Other': 0
// // // //       };
      
// // // //       // casuality Validation (Rule-4) tracking
// // // //       const casualityCounts = {
// // // //         'valid': 0,
// // // //         'invalid': 0,
// // // //         'Pending': 0,
// // // //         'Not Applicable': 0
// // // //       };
      
// // // //       data.forEach(item => {
// // // //         // Count unique eMails
// // // //         if (item.Mail) {
// // // //           uniqueEMails.add(item.Mail);
// // // //         }
        
// // // //         // Count ICSR/AOI items
// // // //         const commentsField = Object.keys(item).find(key => 
// // // //           key.toLowerCase().includes('comments') && 
// // // //           (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
// // // //         );
        
// // // //         if (commentsField && item[commentsField]) {
// // // //           const value = item[commentsField].toString().toUpperCase();
// // // //           if (value.includes('ICSR') || value.includes('AOI')) {
// // // //             icsrAoiCount++;
// // // //           }
// // // //         }
        
// // // //         // Track patient type distribution
// // // //         const patientTypeField = Object.keys(item).find(key => 
// // // //           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // // //         );
        
// // // //         if (patientTypeField && item[patientTypeField]) {
// // // //           const value = item[patientTypeField].toString().toUpperCase();
// // // //           if (value.includes('HUMAN')) {
// // // //             patientTypeCounts['Human']++;
// // // //           } else if (value.includes('ANIMAL')) {
// // // //             patientTypeCounts['Animal']++;
// // // //           } else if (value.includes('STUDY')) {
// // // //             patientTypeCounts['Study']++;
// // // //           } else if (value.includes('ANALYSIS')) {
// // // //             patientTypeCounts['Analysis']++;
// // // //           } else {
// // // //             patientTypeCounts['Other']++;
// // // //           }
// // // //         }
        
// // // //         // Track casuality validation
// // // //         const casualityField = Object.keys(item).find(key => 
// // // //           key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
// // // //         );
        
// // // //         if (casualityField && item[casualityField]) {
// // // //           const value = item[casualityField].toString().toUpperCase();
// // // //           if (value.includes('valid')) {
// // // //             casualityCounts['valid']++;
// // // //           } else if (value.includes('invalid')) {
// // // //             casualityCounts['invalid']++;
// // // //           } else if (value.includes('not selected')) {
// // // //             casualityCounts['Pending']++;
// // // //           } else {
// // // //             casualityCounts['Not Applicable']++;
// // // //           }
// // // //         }
// // // //       });
      
// // // //       // Update stats
// // // //       setStats({
// // // //         eMailCount: uniqueEMails.size,
// // // //         articleCount: data.length,
// // // //         icsrAoiCount: icsrAoiCount
// // // //       });
      
// // // //       // Convert patient type distribution to array for chart
// // // //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // // //         type,
// // // //         count
// // // //       }));
// // // //       setPatientTypeData(patientTypeArray);
      
// // // //       // Convert casuality validation to array for chart
// // // //       const casualityArray = Object.entries(casualityCounts).map(([status, count]) => ({
// // // //         status,
// // // //         count
// // // //       }));
// // // //       setcasualityData(casualityArray);
      
// // // //       setLoading(false);
// // // //     } catch (err) {
// // // //       console.error("Error fetching dashboard data:", err);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Render Patient Type Chart (Enhanced Bar Chart with Icons)
// // // //   const renderPatientTypeChart = () => {
// // // //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// // // //     // Clear previous chart
// // // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // // //     const margin = { top: 40, right: 30, bottom: 70, left: 50 };
// // // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // // //     const height = 300 - margin.top - margin.bottom;

// // // //     // Create SVG
// // // //     const svg = d3.select(patientTypeChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width + margin.left + margin.right)
// // // //       .attr("height", height + margin.top + margin.bottom)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // // //     // Create gradient definitions for bars
// // // //     const defs = svg.append("defs");
    
// // // //     // Create different gradients for each bar
// // // //     patientTypeData.forEach((d, i) => {
// // // //       const color = COLORS[i % COLORS.length];
// // // //       const lighterColor = d3.rgb(color).brighter(0.3);
      
// // // //       const gradient = defs.append("linearGradient")
// // // //         .attr("id", `gradient-${i}`)
// // // //         .attr("x1", "0%")
// // // //         .attr("y1", "0%")
// // // //         .attr("x2", "0%")
// // // //         .attr("y2", "100%");
        
// // // //       gradient.append("stop")
// // // //         .attr("offset", "0%")
// // // //         .attr("stop-color", lighterColor.toString());
        
// // // //       gradient.append("stop")
// // // //         .attr("offset", "100%")
// // // //         .attr("stop-color", color);
// // // //     });

// // // //     // X scale
// // // //     const x = d3.scaleBand()
// // // //       .domain(patientTypeData.map(d => d.type))
// // // //       .range([0, width])
// // // //       .padding(0.4);

// // // //     // Y scale
// // // //     const y = d3.scaleLinear()
// // // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // // //       .range([height, 0]);

// // // //     // Add a subtle background pattern
// // // //     svg.append("rect")
// // // //       .attr("width", width)
// // // //       .attr("height", height)
// // // //       .attr("fill", LIGHT_BG)
// // // //       .attr("rx", 6)
// // // //       .attr("opacity", 0.3);

// // // //     // X axis with styling
// // // //     svg.append("g")
// // // //       .attr("transform", `translate(0,${height})`)
// // // //       .call(d3.axisBottom(x))
// // // //       .selectAll("text")
// // // //       .attr("transform", "translate(-10,0)rotate(-20)")
// // // //       .style("text-anchor", "end")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "500")
// // // //       .style("fill", DARK_COLOR);

// // // //     // Y axis with styling
// // // //     svg.append("g")
// // // //       .call(d3.axisLeft(y)
// // // //         .ticks(5)
// // // //         .tickFormat(d => d))
// // // //       .selectAll("text")
// // // //       .style("font-size", "12px")
// // // //       .style("fill", DARK_COLOR);

// // // //     // Add grid lines (lighter and more subtle)
// // // //     svg.append("g")
// // // //       .attr("class", "grid")
// // // //       .call(d3.axisLeft(y)
// // // //         .ticks(5)
// // // //         .tickSize(-width)
// // // //         .tickFormat(""))
// // // //       .style("stroke", "#e5f1f8")
// // // //       .style("stroke-opacity", 0.7);

// // // //     // Add title with icon
// // // //     svg.append("text")
// // // //       .attr("x", width / 2)
// // // //       .attr("y", -20)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "16px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", DARK_COLOR)
// // // //       .text("Patient Type Distribution");

// // // //     // Create bar groups
// // // //     const barGroups = svg.selectAll(".bar-group")
// // // //       .data(patientTypeData)
// // // //       .enter()
// // // //       .append("g")
// // // //       .attr("class", "bar-group")
// // // //       .attr("transform", d => `translate(${x(d.type)},0)`);

// // // //     // Add bars with animation and interaction
// // // //     barGroups.append("rect")
// // // //       .attr("class", "bar")
// // // //       .attr("x", 0)
// // // //       .attr("y", height)
// // // //       .attr("width", x.bandwidth())
// // // //       .attr("height", 0)
// // // //       .attr("rx", 6)
// // // //       .attr("fill", (d, i) => `url(#gradient-${i})`)
// // // //       .attr("filter", "url(#shadow)")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(300)
// // // //           .attr("y", y(d.count) - 8)
// // // //           .attr("height", height - y(d.count) + 8);
// // // //       })
// // // //       .on("mouseout", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(300)
// // // //           .attr("y", y(d.count))
// // // //           .attr("height", height - y(d.count));
// // // //       })
// // // //       .transition()
// // // //       .duration(800)
// // // //       .delay((d, i) => i * 150)
// // // //       .attr("y", d => y(d.count))
// // // //       .attr("height", d => height - y(d.count));

// // // //     // Define drop shadow for better depth
// // // //     defs.append("filter")
// // // //       .attr("id", "shadow")
// // // //       .append("feDropShadow")
// // // //       .attr("dx", "0")
// // // //       .attr("dy", "2")
// // // //       .attr("stdDeviation", "3")
// // // //       .attr("flood-opacity", "0.3");

// // // //     // Add value labels with animated counting effect
// // // //     barGroups.append("text")
// // // //       .attr("class", "bar-label")
// // // //       .attr("x", x.bandwidth() / 2)
// // // //       .attr("y", d => y(d.count) - 10)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "14px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", DARK_COLOR)
// // // //       .style("opacity", 0)
// // // //       .text(d => "0")
// // // //       .transition()
// // // //       .duration(1000)
// // // //       .delay((d, i) => i * 150)
// // // //       .style("opacity", 1)
// // // //       .tween("text", function(d) {
// // // //         const i = d3.interpolateNumber(0, d.count);
// // // //         return function(t) {
// // // //           this.textContent = Math.round(i(t));
// // // //         };
// // // //       });

// // // //     // Add icons above bars for visual interest
// // // //     const iconPaths = {
// // // //       'Human': "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8",
// // // //       'Animal': "M11.05 2.93a5 5 0 0 1 7.9 0l1.14 1.31a5 5 0 0 1-.51 6.8l-1.32 1.32 3.43 4.1a1 1 0 0 1-.13 1.41l-2.12 1.77a1 1 0 0 1-1.4-.14l-3.33-4-.6.6a5 5 0 0 1-7.6-.41L5.3 14a5 5 0 0 1 .4-6.8l1.13-1.14 4.22-3.13z M14.5 15l5 5",
// // // //       'Study': "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
// // // //       'Analysis': "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
// // // //       'Other': "M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83"
// // // //     };

// // // //     // Add icons with animations
// // // //     barGroups.append("g")
// // // //       .attr("class", "icon")
// // // //       .attr("transform", d => `translate(${x.bandwidth() / 2 - 10}, ${height + 30})`)
// // // //       .append("path")
// // // //       .attr("d", d => iconPaths[d.type] || iconPaths['Other'])
// // // //       .attr("stroke", (d, i) => COLORS[i % COLORS.length])
// // // //       .attr("stroke-width", 1.5)
// // // //       .attr("fill", "none")
// // // //       .attr("opacity", 0)
// // // //       .attr("transform", "scale(0.8)")
// // // //       .transition()
// // // //       .duration(600)
// // // //       .delay((d, i) => 800 + i * 150)
// // // //       .attr("opacity", 1);

// // // //     // Add type labels with icons
// // // //     barGroups.append("text")
// // // //       .attr("class", "type-label")
// // // //       .attr("x", x.bandwidth() / 2)
// // // //       .attr("y", height + 50)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "11px")
// // // //       .style("font-weight", "500")
// // // //       .style("fill", DARK_COLOR)
// // // //       .style("opacity", 0)
// // // //       .text(d => d.type)
// // // //       .transition()
// // // //       .duration(600)
// // // //       .delay((d, i) => 800 + i * 150)
// // // //       .style("opacity", 1);
// // // //   };

// // // //   // Render casuality Validation Chart (Interactive Gauge Chart)
// // // //   const rendercasualityChart = () => {
// // // //     if (!casualityChartRef.current || casualityData.length === 0) return;

// // // //     // Clear previous chart
// // // //     d3.select(casualityChartRef.current).selectAll("*").remove();

// // // //     const width = casualityChartRef.current.clientWidth;
// // // //     const height = 300;
// // // //     const margin = { top: 30, right: 30, bottom: 30, left: 30 };
// // // //     const chartWidth = width - margin.left - margin.right;
// // // //     const chartHeight = height - margin.top - margin.bottom;
    
// // // //     // Calculate total for percentages
// // // //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
    
// // // //     // Calculate percentage for each category
// // // //     casualityData.forEach(d => {
// // // //       d.percentage = d.count / total * 100;
// // // //     });
    
// // // //     // Sort data by count (descending)
// // // //     casualityData.sort((a, b) => b.count - a.count);

// // // //     // Create SVG
// // // //     const svg = d3.select(casualityChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width)
// // // //       .attr("height", height)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // // //     // Define drop shadow for better depth
// // // //     const defs = svg.append("defs");
    
// // // //     defs.append("filter")
// // // //       .attr("id", "shadow-casuality")
// // // //       .append("feDropShadow")
// // // //       .attr("dx", "0")
// // // //       .attr("dy", "2")
// // // //       .attr("stdDeviation", "3")
// // // //       .attr("flood-opacity", "0.3");
      
// // // //     // Background and decoration elements
// // // //     svg.append("rect")
// // // //       .attr("width", chartWidth)
// // // //       .attr("height", chartHeight)
// // // //       .attr("rx", 10)
// // // //       .attr("fill", LIGHT_BG)
// // // //       .attr("opacity", 0.2);
      
// // // //     // Title
// // // //     svg.append("text")
// // // //       .attr("x", chartWidth / 2)
// // // //       .attr("y", 10)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "16px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", DARK_COLOR)
// // // //       .text("casuality Validation (Rule-4)");
    
// // // //     // Create a radial progress gauge chart for each category
// // // //     const gaugeRadius = Math.min(chartWidth / (casualityData.length * 1.5), 60);
// // // //     const centerY = chartHeight / 2 + 20;
// // // //     const spaceBetween = chartWidth / casualityData.length;

// // // //     // Create one gauge per category
// // // //     casualityData.forEach((d, i) => {
// // // //       const centerX = spaceBetween * (i + 0.5);
      
// // // //       // Create gradient for gauge
// // // //       const gaugeGradient = defs.append("linearGradient")
// // // //         .attr("id", `gauge-gradient-${i}`)
// // // //         .attr("x1", "0%")
// // // //         .attr("y1", "0%")
// // // //         .attr("x2", "100%")
// // // //         .attr("y2", "100%");
        
// // // //       gaugeGradient.append("stop")
// // // //         .attr("offset", "0%")
// // // //         .attr("stop-color", d3.rgb(COLORS[i % COLORS.length]).brighter(0.5));
        
// // // //       gaugeGradient.append("stop")
// // // //         .attr("offset", "100%")
// // // //         .attr("stop-color", COLORS[i % COLORS.length]);
      
// // // //       // Gauge container
// // // //       const gauge = svg.append("g")
// // // //         .attr("class", "gauge")
// // // //         .attr("transform", `translate(${centerX}, ${centerY})`);
        
// // // //       // Background circle
// // // //       gauge.append("circle")
// // // //         .attr("cx", 0)
// // // //         .attr("cy", 0)
// // // //         .attr("r", gaugeRadius)
// // // //         .attr("fill", "none")
// // // //         .attr("stroke", "#e5e5e5")
// // // //         .attr("stroke-width", 10)
// // // //         .attr("filter", "url(#shadow-casuality)");
        
// // // //       // Percentage arc
// // // //       const arc = d3.arc()
// // // //         .innerRadius(gaugeRadius - 10)
// // // //         .outerRadius(gaugeRadius)
// // // //         .startAngle(-Math.PI / 2)
// // // //         .endAngle(d => (-Math.PI / 2) + (2 * Math.PI * d.percentage / 100));
        
// // // //       gauge.append("path")
// // // //         .datum(d)
// // // //         .attr("d", arc)
// // // //         .attr("fill", `url(#gauge-gradient-${i})`)
// // // //         .attr("stroke", "white")
// // // //         .attr("stroke-width", 1)
// // // //         .attr("opacity", 0)
// // // //         .transition()
// // // //         .duration(1500)
// // // //         .delay(i * 200)
// // // //         .attrTween("d", function(d) {
// // // //           const interpolate = d3.interpolate(0, d.percentage);
// // // //           return function(t) {
// // // //             const newAngle = (-Math.PI / 2) + (2 * Math.PI * interpolate(t) / 100);
// // // //             const newArc = d3.arc()
// // // //               .innerRadius(gaugeRadius - 10)
// // // //               .outerRadius(gaugeRadius)
// // // //               .startAngle(-Math.PI / 2)
// // // //               .endAngle(newAngle);
// // // //             return newArc(d);
// // // //           };
// // // //         })
// // // //         .attr("opacity", 1);
        
// // // //       // Percentage text in center
// // // //       gauge.append("text")
// // // //         .attr("x", 0)
// // // //         .attr("y", 0)
// // // //         .attr("text-anchor", "middle")
// // // //         .attr("dominant-baseline", "middle")
// // // //         .style("font-size", "18px")
// // // //         .style("font-weight", "bold")
// // // //         .style("fill", DARK_COLOR)
// // // //         .text("0%")
// // // //         .transition()
// // // //         .duration(1500)
// // // //         .delay(i * 200)
// // // //         .tween("text", function() {
// // // //           const interpolate = d3.interpolate(0, d.percentage);
// // // //           return function(t) {
// // // //             this.textContent = `${Math.round(interpolate(t))}%`;
// // // //           };
// // // //         });
        
// // // //       // Count below percentage
// // // //       gauge.append("text")
// // // //         .attr("x", 0)
// // // //         .attr("y", gaugeRadius / 2 + 5)
// // // //         .attr("text-anchor", "middle")
// // // //         .style("font-size", "14px")
// // // //         .style("fill", DARK_COLOR)
// // // //         .style("opacity", 0)
// // // //         .text(`(${d.count})`)
// // // //         .transition()
// // // //         .duration(800)
// // // //         .delay(i * 200 + 1000)
// // // //         .style("opacity", 1);
        
// // // //       // Status label
// // // //       gauge.append("text")
// // // //         .attr("x", 0)
// // // //         .attr("y", -gaugeRadius - 10)
// // // //         .attr("text-anchor", "middle")
// // // //         .style("font-size", "12px")
// // // //         .style("font-weight", "500")
// // // //         .style("fill", COLORS[i % COLORS.length])
// // // //         .style("opacity", 0)
// // // //         .text(d.status)
// // // //         .transition()
// // // //         .duration(800)
// // // //         .delay(i * 200 + 500)
// // // //         .style("opacity", 1);
        
// // // //       // Add decorative pulse animation to the highest value gauge
// // // //       if (i === 0) {
// // // //         gauge.append("circle")
// // // //           .attr("cx", 0)
// // // //           .attr("cy", 0)
// // // //           .attr("r", gaugeRadius + 5)
// // // //           .attr("fill", "none")
// // // //           .attr("stroke", COLORS[i % COLORS.length])
// // // //           .attr("stroke-width", 2)
// // // //           .attr("opacity", 0)
// // // //           .style("transform-origin", "center center")
// // // //           .transition()
// // // //           .duration(2000)
// // // //           .delay(1500)
// // // //           .attr("opacity", 0.7)
// // // //           .transition()
// // // //           .duration(1500)
// // // //           .attr("opacity", 0)
// // // //           .attr("r", gaugeRadius + 20)
// // // //           .on("end", function repeat() {
// // // //             d3.select(this)
// // // //               .attr("r", gaugeRadius + 5)
// // // //               .attr("opacity", 0)
// // // //               .transition()
// // // //               .duration(2000)
// // // //               .attr("opacity", 0.7)
// // // //               .transition()
// // // //               .duration(1500)
// // // //               .attr("opacity", 0)
// // // //               .attr("r", gaugeRadius + 20)
// // // //               .on("end", repeat);
// // // //           });
// // // //       }
// // // //     });
// // // //   };

// // // //   // Get current date for display
// // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // //     weekday: 'long',
// // // //     year: 'numeric',
// // // //     month: 'long',
// // // //     day: 'numeric'
// // // //   });

// // // //   // Simple formatter for large numbers
// // // //   const formatNumber = (num) => {
// // // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // // //   };

// // // //   // Handle navigation when clicking on cards
// // // //   const handleCardClick = (route) => {
// // // //     navigate(route);
// // // //   };

// // // //   // Animation classes for elements
// // // //   const fadeInClass = "animate-fadeIn";
// // // //   const slideUpClass = "animate-slideUp";
// // // //   const pulseClass = "animate-pulse";

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 p-6 md:p-10">
// // // //       <div className={`mb-10 ${fadeInClass}`}>
// // // //         <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
// // // //         <div className="flex items-center mt-2">
// // // //           <div className="h-1 w-10 bg-cyan-500 rounded mr-3"></div>
// // // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // // //         </div>
// // // //       </div>

// // // //       {loading ? (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <div className="relative">
// // // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-cyan-500 border-t-transparent"></div>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           {/* Stat Cards */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
// // // //             <div 
// // // //               className={`bg-gradient-to-br from-cyan-50 to-white rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // // //               style={{animationDelay: '100ms'}}
// // // //               onClick={() => handleCardClick('/literature-review')}
// // // //             >
// // // //               <div className="rounded-full bg-cyan-100 p-4 mr-5 flex items-center justify-center">
// // // //                 <Activity size={22} className="text-cyan-600" />
// // // //               </div>
// // // //               <div className="flex-grow">
// // // //                 <h3 className="text-base font-medium text-gray-500 mb-1">Unique EMails</h3>
// // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// // // //               </div>
// // // //               <ArrowRight size={18} className="text-cyan-600 opacity-50" />
// // // //             </div>

// // // //             <div 
// // // //               className={`bg-gradient-to-br from-teal-50 to-white rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // // //               style={{animationDelay: '200ms'}}
// // // //               onClick={() => handleCardClick('/cases')}
// // // //             >
// // // //               <div className="rounded-full bg-teal-100 p-4 mr-5 flex items-center justify-center">
// // // //                 <FileText size={22} className="text-teal-600" />
// // // //               </div>
// // // //               <div className="flex-grow">
// // // //                 <h3 className="text-base font-medium text-gray-500 mb-1">Total Articles</h3>
// // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// // // //               </div>
// // // //               <ArrowRight size={18} className="text-teal-600 opacity-50" />
// // // //             </div>

// // // //             <div 
// // // //               className={`bg-gradient-to-br from-sky-50 to-white rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // // //               style={{animationDelay: '300ms'}}
// // // //               onClick={() => handleCardClick('/medical-review')}
// // // //             >
// // // //               <div className="rounded-full bg-sky-100 p-4 mr-5 flex items-center justify-center">
// // // //                 <AlertCircle size={22} className="text-sky-600" />
// // // //               </div>
// // // //               <div className="flex-grow">
// // // //                 <h3 className="text-base font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.icsrAoiCount)}</p>
// // // //               </div>
// // // //               <ArrowRight size={18} className="text-sky-600 opacity-50" />
// // // //             </div>
// // // //           </div>

// // // //           {/* Charts Section */}
// // // //           <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8 mb-10">
// // // //             {/* Patient Type Chart */}
// // // //             <div className={`bg-white rounded-lg shadow-md p-6 ${fadeInClass}`} style={{animationDelay: '400ms'}}>
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // // //                 <Users size={18} className="mr-2 text-cyan-600" /> Patient Type Distribution
// // // //               </h3>
// // // //               <div className="h-64" ref={patientTypeChartRef}></div>
// // // //             </div>
// // // //           </div>

// // // //           {/* casuality Validation Chart Section */}
// // // //           <div className={`bg-white rounded-lg shadow-md p-6 ${fadeInClass}`} style={{animationDelay: '600ms'}}>
// // // //             <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // // //               <Zap size={18} className="mr-2 text-teal-600" /> casuality Validation (Rule-4)
// // // //             </h3>
// // // //             <div className="h-64" ref={casualityChartRef}></div>
// // // //           </div>
// // // //         </>
// // // //       )}

// // // //       {/* Add global styles for animations */}
// // // //       <style jsx>{`
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; }
// // // //           to { opacity: 1; }
// // // //         }
        
// // // //         @keyframes slideUp {
// // // //           from { opacity: 0; transform: translateY(20px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
        
// // // //         @keyframes pulse {
// // // //           0% { transform: scale(1); opacity: 1; }
// // // //           50% { transform: scale(1.05); opacity: 0.8; }
// // // //           100% { transform: scale(1); opacity: 1; }
// // // //         }
        
// // // //         .animate-fadeIn {
// // // //           animation: fadeIn 0.6s ease-out forwards;
// // // //         }
        
// // // //         .animate-slideUp {
// // // //           animation: slideUp 0.6s ease-out forwards;
// // // //         }
        
// // // //         .animate-pulse {
// // // //           animation: pulse 2s infinite ease-in-out;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;
// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { Activity, FileText, AlertCircle, TrendingUp, Users, ArrowRight, Droplet, Zap } from 'lucide-react';
// // // import DatabaseService from '../services/DatabaseService';

// // // const Dashboard = () => {
// // //   const [stats, setStats] = useState({
// // //     eMailCount: 0,
// // //     articleCount: 0,
// // //     icsrAoiCount: 0
// // //   });
  
// // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // //   const [casualityData, setcasualityData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [chartRendered, setChartRendered] = useState(false);
  
// // //   // Using blue color palette
// // //   const COLORS = [
// // //     '#0ea5e9', // bright blue
// // //     '#0891b2', // cyan
// // //     '#0e766e', // teal
// // //     '#0d9488', // teal light
// // //     '#14b8a6', // sea green
// // //   ];

// // //   useEffect(() => {
// // //     fetchDashboardData();
    
// // //     // Add entrance animation for elements
// // //     const timer = setTimeout(() => {
// // //       setChartRendered(true);
// // //     }, 300);
    
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       // Fetch literature data using the DatabaseService
// // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // //       // Calculate stats
// // //       const uniqueEMails = new Set();
// // //       let icsrAoiCount = 0;
      
// // //       // Patient Type tracking
// // //       const patientTypeCounts = {
// // //         'Human': 0,
// // //         'Animal': 0,
// // //         'Study': 0,
// // //         'Analysis': 0,
// // //         'Other': 0
// // //       };
      
// // //       // casuality Validation (Rule-4) tracking
// // //       const casualityCounts = {
// // //         'valid': 0,
// // //         'invalid': 0,
// // //         'Pending': 0,
// // //         'Not Applicable': 0
// // //       };
      
// // //       data.forEach(item => {
// // //         // Count unique eMails
// // //         if (item.Mail) {
// // //           uniqueEMails.add(item.Mail);
// // //         }
        
// // //         // Count ICSR/AOI items
// // //         const commentsField = Object.keys(item).find(key => 
// // //           key.toLowerCase().includes('comments') && 
// // //           (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
// // //         );
        
// // //         if (commentsField && item[commentsField]) {
// // //           const value = item[commentsField].toString().toUpperCase();
// // //           if (value.includes('ICSR') || value.includes('AOI')) {
// // //             icsrAoiCount++;
// // //           }
// // //         }
        
// // //         // Track patient type distribution
// // //         const patientTypeField = Object.keys(item).find(key => 
// // //           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // //         );
        
// // //         if (patientTypeField && item[patientTypeField]) {
// // //           const value = item[patientTypeField].toString().toUpperCase();
// // //           if (value.includes('HUMAN')) {
// // //             patientTypeCounts['Human']++;
// // //           } else if (value.includes('ANIMAL')) {
// // //             patientTypeCounts['Animal']++;
// // //           } else if (value.includes('STUDY')) {
// // //             patientTypeCounts['Study']++;
// // //           } else if (value.includes('ANALYSIS')) {
// // //             patientTypeCounts['Analysis']++;
// // //           } else {
// // //             patientTypeCounts['Other']++;
// // //           }
// // //         }
        
// // //         // Track casuality validation
// // //         const casualityField = Object.keys(item).find(key => 
// // //           key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
// // //         );
        
// // //         if (casualityField && item[casualityField]) {
// // //           const value = item[casualityField].toString().toUpperCase();
// // //           if (value.includes('VALID')) {
// // //             casualityCounts['valid']++;
// // //           } else if (value.includes('INVALID')) {
// // //             casualityCounts['invalid']++;
// // //           } else if (value.includes('PENDING') || value.includes('NOT SELECTED')) {
// // //             casualityCounts['Pending']++;
// // //           } else {
// // //             casualityCounts['Not Applicable']++;
// // //           }
// // //         }
// // //       });
      
// // //       // Update stats
// // //       setStats({
// // //         eMailCount: uniqueEMails.size,
// // //         articleCount: data.length,
// // //         icsrAoiCount: icsrAoiCount
// // //       });
      
// // //       // Convert patient type distribution to array for chart
// // //       const patientTypeArray = Object.entries(patientTypeCounts)
// // //         .map(([type, count]) => ({ type, count }))
// // //         .filter(item => item.count > 0); // Only include non-zero counts
      
// // //       setPatientTypeData(patientTypeArray);
      
// // //       // Convert casuality validation to array for chart
// // //       const casualityArray = Object.entries(casualityCounts)
// // //         .map(([status, count]) => ({ status, count }))
// // //         .filter(item => item.count > 0); // Only include non-zero counts
      
// // //       setcasualityData(casualityArray);
      
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error("Error fetching dashboard data:", err);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Format numbers for display
// // //   const formatNumber = (num) => {
// // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // //   };

// // //   // Get current date
// // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // //     weekday: 'long',
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric'
// // //   });
  
// // //   // Calculate percentages for casuality data
// // //   const totalCauses = casualityData.reduce((sum, item) => sum + item.count, 0) || 1; // Prevent division by zero
// // //   const casualityWithPercentage = casualityData.map(item => ({
// // //     ...item,
// // //     percentage: Math.round((item.count / totalCauses) * 100)
// // //   }));

// // //   // Handle navigation (to be connected to your router)
// // //   const handleCardClick = (route) => {
// // //     // navigate(route); // Uncomment this if you have react-router
// // //     console.log(`Navigating to: ${route}`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-6 md:p-10">
// // //       <div className="mb-10 animate-fadeIn">
// // //         <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
// // //         <div className="flex items-center mt-2">
// // //           <div className="h-1 w-10 bg-blue-500 rounded mr-3"></div>
// // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="relative">
// // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent"></div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {/* Stat Cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
// // //             {/* EMail Card */}
// // //             <div 
// // //               className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-slideUp"
// // //               onClick={() => handleCardClick('/literature-review')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <Activity size={24} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-blue-100 mb-1">Unique EMails</h3>
// // //                 <p className="text-3xl font-bold text-white">{formatNumber(stats.eMailCount)}</p>
// // //               </div>
// // //               <ArrowRight size={20} className="text-white/70" />
// // //             </div>

// // //             {/* Articles Card */}
// // //             <div 
// // //               className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-slideUp" 
// // //               style={{animationDelay: '200ms'}}
// // //               onClick={() => handleCardClick('/cases')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <FileText size={24} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-blue-100 mb-1">Total Articles</h3>
// // //                 <p className="text-3xl font-bold text-white">{formatNumber(stats.articleCount)}</p>
// // //               </div>
// // //               <ArrowRight size={20} className="text-white/70" />
// // //             </div>

// // //             {/* ICSR/AOI Cases Card */}
// // //             <div 
// // //               className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-lg p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-slideUp" 
// // //               style={{animationDelay: '300ms'}}
// // //               onClick={() => handleCardClick('/medical-review')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <AlertCircle size={24} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-blue-100 mb-1">ICSR / AOI Cases</h3>
// // //                 <p className="text-3xl font-bold text-white">{formatNumber(stats.icsrAoiCount)}</p>
// // //               </div>
// // //               <ArrowRight size={20} className="text-white/70" />
// // //             </div>
// // //           </div>

// // //           {/* Patient Type Distribution */}
// // //           {patientTypeData.length > 0 && (
// // //             <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fadeIn" style={{animationDelay: '400ms'}}>
// // //               <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // //                 <Users size={20} className="mr-2 text-blue-600" /> Patient Type Distribution
// // //               </h3>
              
// // //               <div className="overflow-hidden">
// // //                 <div className="flex flex-col md:flex-row justify-around items-center md:items-end h-64 mb-6">
// // //                   {patientTypeData.map((item, index) => {
// // //                     // Calculate height percentage (max 80% of container)
// // //                     const maxValue = Math.max(...patientTypeData.map(d => d.count));
// // //                     const heightPercentage = maxValue > 0 ? (item.count / maxValue) * 80 : 0;
                    
// // //                     // Choose appropriate icon based on type
// // //                     let TypeIcon = Users;
// // //                     if (item.type === 'Animal') TypeIcon = Droplet;
// // //                     else if (item.type === 'Study') TypeIcon = FileText;
// // //                     else if (item.type === 'Analysis') TypeIcon = TrendingUp;
// // //                     else if (item.type === 'Other') TypeIcon = AlertCircle;
                    
// // //                     return (
// // //                       <div key={item.type} className="flex flex-col items-center mb-6 md:mb-0 animate-slideUp" style={{
// // //                         animationDelay: `${500 + index * 150}ms`
// // //                       }}>
// // //                         <div className="text-sm font-semibold text-gray-700 mb-2">{item.count}</div>
// // //                         <div 
// // //                           className="rounded-t-lg w-16 md:w-20 transition-all duration-1000 ease-out"
// // //                           style={{
// // //                             height: `${heightPercentage}%`,
// // //                             backgroundColor: COLORS[index % COLORS.length],
// // //                             boxShadow: `0 4px 6px -1px ${COLORS[index % COLORS.length]}40`,
// // //                           }}
// // //                         ></div>
// // //                         <div className="flex flex-col items-center mt-3">
// // //                           <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{backgroundColor: `${COLORS[index % COLORS.length]}20`}}>
// // //                             <TypeIcon size={16} color={COLORS[index % COLORS.length]} />
// // //                           </div>
// // //                           <div className="text-xs font-medium text-gray-600">{item.type}</div>
// // //                         </div>
// // //                       </div>
// // //                     )
// // //                   })}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* casuality Validation */}
// // //           {casualityData.length > 0 && (
// // //             <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn" style={{animationDelay: '600ms'}}>
// // //               <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // //                 <Zap size={20} className="mr-2 text-blue-600" /> casuality Validation (Rule-4)
// // //               </h3>
              
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                 {casualityWithPercentage.map((item, index) => (
// // //                   <div 
// // //                     key={item.status} 
// // //                     className="bg-slate-50 rounded-lg p-6 flex flex-col items-center animate-fadeIn"
// // //                     style={{animationDelay: `${700 + index * 150}ms`}}
// // //                   >
// // //                     <div className="mb-3 text-sm font-medium text-gray-600">
// // //                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
// // //                     </div>
// // //                     <div className="relative w-24 h-24 mb-4">
// // //                       {/* Background circle */}
// // //                       <div className="absolute inset-0 rounded-full border-8 border-slate-200"></div>
                      
// // //                       {/* Progress circle with stroke-dasharray animation */}
// // //                       <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
// // //                         <circle 
// // //                           cx="50" 
// // //                           cy="50" 
// // //                           r="41" 
// // //                           fill="none" 
// // //                           strokeWidth="8"
// // //                           stroke={COLORS[index % COLORS.length]}
// // //                           strokeDasharray={`${item.percentage * 2.59} 259`}
// // //                           className={`transform origin-center ${chartRendered ? 'transition-all duration-1000 ease-out' : ''}`}
// // //                           style={{
// // //                             strokeDashoffset: chartRendered ? 0 : 259,
// // //                           }}
// // //                         />
// // //                       </svg>
                      
// // //                       {/* Percentage text */}
// // //                       <div className="absolute inset-0 flex items-center justify-center">
// // //                         <div className="text-xl font-bold text-gray-800">{item.percentage}%</div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="text-base font-medium text-gray-700">({item.count})</div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* Add global styles for animations */}
// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; }
// // //           to { opacity: 1; }
// // //         }
        
// // //         @keyframes slideUp {
// // //           from { opacity: 0; transform: translateY(20px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }
        
// // //         .animate-fadeIn {
// // //           animation: fadeIn 0.6s ease-out forwards;
// // //           opacity: 0;
// // //           animation-fill-mode: forwards;
// // //         }
        
// // //         .animate-slideUp {
// // //           animation: slideUp 0.6s ease-out forwards;
// // //           opacity: 0;
// // //           animation-fill-mode: forwards;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // // import React, { useEffect, useState, useRef, useMemo } from 'react';
// // // import { Mail, FileText, AlertCircle, TrendingUp, Users, ArrowRight, Droplet, Zap } from 'lucide-react';
// // // import { useNavigate } from 'react-router-dom';
// // // import DatabaseService from '../services/DatabaseService';
// // // import * as d3 from 'd3';

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const [stats, setStats] = useState({
// // //     eMailCount: 0,
// // //     articleCount: 0,
// // //     icsrAoiCount: 0
// // //   });
  
// // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // //   const [casualityData, setcasualityData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isChartRendered, setIsChartRendered] = useState(false);
  
// // //   // Refs for chart containers
// // //   const patientTypeChartRef = useRef(null);
// // //   const casualityChartRef = useRef(null);
  
// // //   // Color palette with blue shades
// // //   const COLORS = useMemo(() => [
// // //     '#0c4a6e', // blue-900
// // //     '#075985', // blue-800
// // //     '#0369a1', // blue-700
// // //     '#0284c7', // blue-600
// // //     '#0ea5e9', // blue-500
// // //     '#38bdf8', // blue-400
// // //   ], []);
  
// // //   const MAIN_COLOR = '#14242c';     // dark blue-gray
// // //   const SECONDARY_COLOR = '#1e3a5f'; // medium blue
// // //   const TEXT_COLOR = '#ffffff';      // white text
// // //   const LIGHT_BG = '#e0f2fe';        // light blue bg

// // //   useEffect(() => {
// // //     fetchDashboardData();
    
// // //     // Add entrance animation for elements
// // //     const timer = setTimeout(() => {
// // //       setIsChartRendered(true);
// // //     }, 300);
    
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   // Effect to render charts when data is loaded
// // //   useEffect(() => {
// // //     if (!loading && patientTypeData.length > 0 && isChartRendered) {
// // //       renderPatientTypeChart();
// // //       rendercasualityChart();
// // //     }
// // //   }, [loading, patientTypeData, casualityData, isChartRendered, COLORS]);

// // // // Replace the hardcoded patient type and casuality tracking with dynamic extraction
// // // const fetchDashboardData = async () => {
// // //   try {
// // //     // Fetch literature data using the same service as in LiteratureReviewContent
// // //     const data = await DatabaseService.fetchLiteratureReviews();
    
// // //     // Calculate stats
// // //     const uniqueEMails = new Set();
// // //     let icsrAoiCount = 0;
    
// // //     // Dynamic tracking objects for Patient Type and casuality
// // //     const patientTypeCounts = {};
// // //     const casualityCounts = {};
    
// // //     data.forEach(item => {
// // //       // Count unique eMails
// // //       if (item.Mail) {
// // //         uniqueEMails.add(item.Mail);
// // //       }
      
// // //       // Count ICSR/AOI items
// // //       const commentsField = Object.keys(item).find(key => 
// // //         key.toLowerCase().includes('comments') && 
// // //         (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
// // //       );
      
// // //       if (commentsField && item[commentsField]) {
// // //         const value = item[commentsField].toString().toUpperCase();
// // //         if (value.includes('ICSR') || value.includes('AOI')) {
// // //           icsrAoiCount++;
// // //         }
// // //       }
      
// // //       // Dynamically track patient type distribution
// // //       const patientTypeField = Object.keys(item).find(key => 
// // //         key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // //       );
      
// // //       if (patientTypeField && item[patientTypeField]) {
// // //         const value = item[patientTypeField].toString().trim();
// // //         // Initialize counter if this value hasn't been seen before
// // //         if (!patientTypeCounts[value]) {
// // //           patientTypeCounts[value] = 0;
// // //         }
// // //         patientTypeCounts[value]++;
// // //       }
// // //       const casualityFieldName = "Casuality Validation (Rule-4)";
// // //       // Dynamically track casuality validation
// // //       const casualityField = Object.keys(item).find(key => 
// // //         key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
// // //       );
      
// // //       if (item[casualityFieldName] !== undefined) {
// // //         let value = item[casualityFieldName].toString().trim();
        
// // //         // Handle empty values
// // //         if (!value) {
// // //           value = "Pending";
// // //         }
        
// // //         // Initialize counter if this value hasn't been seen before
// // //         if (!casualityCounts[value]) {
// // //           casualityCounts[value] = 0;
// // //         }
// // //         casualityCounts[value]++;
// // //       }
// // //     });
    
// // //     // Update stats
// // //     setStats({
// // //       eMailCount: uniqueEMails.size,
// // //       articleCount: data.length,
// // //       icsrAoiCount: icsrAoiCount
// // //     });
    
// // //     // Convert patient type distribution to array for chart
// // //     const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // //       type,
// // //       count
// // //     }));
// // //     setPatientTypeData(patientTypeArray);
    
// // //     // Convert casuality validation to array for chart
// // //     const casualityArray = Object.entries(casualityCounts).map(([status, count]) => ({
// // //       status,
// // //       count
// // //     }));
// // //     setcasualityData(casualityArray);
    
// // //     setLoading(false);
// // //   } catch (err) {
// // //     console.error("Error fetching dashboard data:", err);
// // //     setLoading(false);
// // //   }
// // // };

// // //   // Render Patient Type Chart - Bar Chart with Icons
// // //   const renderPatientTypeChart = () => {
// // //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// // //     // Clear previous chart
// // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // //     const margin = { top: 40, right: 30, bottom: 70, left: 50 };
// // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // //     const height = 300 - margin.top - margin.bottom;

// // //     // Create SVG
// // //     const svg = d3.select(patientTypeChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width + margin.left + margin.right)
// // //       .attr("height", height + margin.top + margin.bottom)
// // //       .append("g")
// // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // //     // Create gradient definitions for bars
// // //     const defs = svg.append("defs");
    
// // //     // Create different gradients for each bar
// // //     patientTypeData.forEach((d, i) => {
// // //       const color = COLORS[i % COLORS.length];
// // //       const lighterColor = d3.rgb(color).brighter(0.3);
      
// // //       const gradient = defs.append("linearGradient")
// // //         .attr("id", `gradient-${i}`)
// // //         .attr("x1", "0%")
// // //         .attr("y1", "0%")
// // //         .attr("x2", "0%")
// // //         .attr("y2", "100%");
        
// // //       gradient.append("stop")
// // //         .attr("offset", "0%")
// // //         .attr("stop-color", lighterColor.toString());
        
// // //       gradient.append("stop")
// // //         .attr("offset", "100%")
// // //         .attr("stop-color", color);
// // //     });

// // //     // X scale
// // //     const x = d3.scaleBand()
// // //       .domain(patientTypeData.map(d => d.type))
// // //       .range([0, width])
// // //       .padding(0.4);

// // //     // Y scale
// // //     const y = d3.scaleLinear()
// // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // //       .range([height, 0]);

// // //     // Add a subtle background pattern
// // //     svg.append("rect")
// // //       .attr("width", width)
// // //       .attr("height", height)
// // //       .attr("fill", LIGHT_BG)
// // //       .attr("rx", 6)
// // //       .attr("opacity", 0.3);

// // //     // X axis with styling
// // //     svg.append("g")
// // //       .attr("transform", `translate(0,${height})`)
// // //       .call(d3.axisBottom(x))
// // //       .selectAll("text")
// // //       .attr("transform", "translate(-10,0)rotate(-20)")
// // //       .style("text-anchor", "end")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "500")
// // //       .style("fill", MAIN_COLOR);

// // //     // Y axis with styling
// // //     svg.append("g")
// // //       .call(d3.axisLeft(y)
// // //         .ticks(5)
// // //         .tickFormat(d => d))
// // //       .selectAll("text")
// // //       .style("font-size", "12px")
// // //       .style("fill", MAIN_COLOR);

// // //     // Add grid lines
// // //     svg.append("g")
// // //       .attr("class", "grid")
// // //       .call(d3.axisLeft(y)
// // //         .ticks(5)
// // //         .tickSize(-width)
// // //         .tickFormat(""))
// // //       .style("stroke", "#e5f1f8")
// // //       .style("stroke-opacity", 0.7);

// // //     // Add title with icon
// // //     svg.append("text")
// // //       .attr("x", width / 2)
// // //       .attr("y", -20)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "16px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", MAIN_COLOR)
// // //       .text("Patient Type Distribution");

// // //     // Create bar groups
// // //     const barGroups = svg.selectAll(".bar-group")
// // //       .data(patientTypeData)
// // //       .enter()
// // //       .append("g")
// // //       .attr("class", "bar-group")
// // //       .attr("transform", d => `translate(${x(d.type)},0)`);

// // //     // Define drop shadow for better depth
// // //     defs.append("filter")
// // //       .attr("id", "shadow")
// // //       .append("feDropShadow")
// // //       .attr("dx", "0")
// // //       .attr("dy", "2")
// // //       .attr("stdDeviation", "3")
// // //       .attr("flood-opacity", "0.3");

// // //     // Add bars with animation and interaction
// // //     barGroups.append("rect")
// // //       .attr("class", "bar")
// // //       .attr("x", 0)
// // //       .attr("y", height)
// // //       .attr("width", x.bandwidth())
// // //       .attr("height", 0)
// // //       .attr("rx", 6)
// // //       .attr("fill", (d, i) => `url(#gradient-${i})`)
// // //       .attr("filter", "url(#shadow)")
// // //       .on("mouseover", function(event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(300)
// // //           .attr("y", y(d.count) - 8)
// // //           .attr("height", height - y(d.count) + 8);
// // //       })
// // //       .on("mouseout", function(event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(300)
// // //           .attr("y", y(d.count))
// // //           .attr("height", height - y(d.count));
// // //       })
// // //       .transition()
// // //       .duration(800)
// // //       .delay((d, i) => i * 150)
// // //       .attr("y", d => y(d.count))
// // //       .attr("height", d => height - y(d.count));

// // //     // Add value labels with animated counting effect
// // //     barGroups.append("text")
// // //       .attr("class", "bar-label")
// // //       .attr("x", x.bandwidth() / 2)
// // //       .attr("y", d => y(d.count) - 10)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "14px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", MAIN_COLOR)
// // //       .style("opacity", 0)
// // //       .text(d => "0")
// // //       .transition()
// // //       .duration(1000)
// // //       .delay((d, i) => i * 150)
// // //       .style("opacity", 1)
// // //       .tween("text", function(d) {
// // //         const i = d3.interpolateNumber(0, d.count);
// // //         return function(t) {
// // //           this.textContent = Math.round(i(t));
// // //         };
// // //       });

// // //     // Add icons above bars for visual interest
// // //     const iconPaths = {
// // //       'Human': "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8",
// // //       'Animal': "M11.05 2.93a5 5 0 0 1 7.9 0l1.14 1.31a5 5 0 0 1-.51 6.8l-1.32 1.32 3.43 4.1a1 1 0 0 1-.13 1.41l-2.12 1.77a1 1 0 0 1-1.4-.14l-3.33-4-.6.6a5 5 0 0 1-7.6-.41L5.3 14a5 5 0 0 1 .4-6.8l1.13-1.14 4.22-3.13z M14.5 15l5 5",
// // //       'Study': "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
// // //       'Analysis': "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
// // //       'Other': "M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83"
// // //     };

// // //     // Add icons with animations
// // //     barGroups.append("g")
// // //       .attr("class", "icon")
// // //       .attr("transform", d => `translate(${x.bandwidth() / 2 - 10}, ${height + 30})`)
// // //       .append("path")
// // //       .attr("d", d => iconPaths[d.type] || iconPaths['Other'])
// // //       .attr("stroke", (d, i) => COLORS[i % COLORS.length])
// // //       .attr("stroke-width", 1.5)
// // //       .attr("fill", "none")
// // //       .attr("opacity", 0)
// // //       .attr("transform", "scale(0.8)")
// // //       .transition()
// // //       .duration(600)
// // //       .delay((d, i) => 800 + i * 150)
// // //       .attr("opacity", 1);

// // //     // Add type labels with icons
// // //     barGroups.append("text")
// // //       .attr("class", "type-label")
// // //       .attr("x", x.bandwidth() / 2)
// // //       .attr("y", height + 50)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "11px")
// // //       .style("font-weight", "500")
// // //       .style("fill", MAIN_COLOR)
// // //       .style("opacity", 0)
// // //       .text(d => d.type)
// // //       .transition()
// // //       .duration(600)
// // //       .delay((d, i) => 800 + i * 150)
// // //       .style("opacity", 1);
// // //   };

// // //   // Render casuality Validation Chart - Interactive Wave Chart
// // //   const rendercasualityChart = () => {
// // //     if (!casualityChartRef.current || casualityData.length === 0) return;

// // //     // Clear previous chart
// // //     d3.select(casualityChartRef.current).selectAll("*").remove();

// // //     const width = casualityChartRef.current.clientWidth;
// // //     const height = 300;
// // //     const margin = { top: 40, right: 30, bottom: 50, left: 30 };
// // //     const chartWidth = width - margin.left - margin.right;
// // //     const chartHeight = height - margin.top - margin.bottom;
    
// // //     // Calculate total for percentages
// // //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
    
// // //     // Calculate percentage for each category
// // //     casualityData.forEach(d => {
// // //       d.percentage = d.count / total * 100;
// // //     });
    
// // //     // Sort data by count (descending)
// // //     casualityData.sort((a, b) => b.count - a.count);

// // //     // Create SVG
// // //     const svg = d3.select(casualityChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width)
// // //       .attr("height", height)
// // //       .append("g")
// // //       .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // //     // Background and decoration
// // //     svg.append("rect")
// // //       .attr("width", chartWidth)
// // //       .attr("height", chartHeight)
// // //       .attr("rx", 10)
// // //       .attr("fill", LIGHT_BG)
// // //       .attr("opacity", 0.2);
      
// // //     // Title
// // //     svg.append("text")
// // //       .attr("x", chartWidth / 2)
// // //       .attr("y", -20)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "16px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", MAIN_COLOR)
// // //       .text("casuality Validation (Rule-4)");
      
// // //     // Create liquid wave effect for each category
// // //     const defs = svg.append("defs");
    
// // //     // Create clipPath for each category
// // //     casualityData.forEach((d, i) => {
// // //       // Create wave pattern
// // //       const waveId = `wave-${i}`;
// // //       const clipId = `clip-${i}`;
      
// // //       // Create wave pattern
// // //       const wave = defs.append("pattern")
// // //         .attr("id", waveId)
// // //         .attr("width", 200)
// // //         .attr("height", 20)
// // //         .attr("patternUnits", "userSpaceOnUse")
// // //         .attr("patternTransform", "rotate(0)");
        
// // //       wave.append("path")
// // //         .attr("d", "M0,10 C50,0 150,20 200,10 L200,20 L0,20 Z")
// // //         .attr("fill", COLORS[i % COLORS.length]);
        
// // //       // Create clipPath for container
// // //       defs.append("clipPath")
// // //         .attr("id", clipId)
// // //         .append("rect")
// // //         .attr("x", 0)
// // //         .attr("y", 0)
// // //         .attr("width", 80)
// // //         .attr("height", 100)
// // //         .attr("rx", 10);
// // //     });
    
// // //     // Container width and spacing
// // //     const containerWidth = 80;
// // //     const spacing = (chartWidth - containerWidth * casualityData.length) / (casualityData.length + 1);
    
// // //     // Create liquid container for each category
// // //     casualityData.forEach((d, i) => {
// // //       const x = spacing + i * (containerWidth + spacing);
// // //       const containerHeight = 100;
// // //       const y = chartHeight / 2 - containerHeight / 2;
      
// // //       // Container group
// // //       const container = svg.append("g")
// // //         .attr("transform", `translate(${x}, ${y})`);
        
// // //       // Container outline
// // //       container.append("rect")
// // //         .attr("width", containerWidth)
// // //         .attr("height", containerHeight)
// // //         .attr("rx", 10)
// // //         .attr("fill", "none")
// // //         .attr("stroke", COLORS[i % COLORS.length])
// // //         .attr("stroke-width", 2);
        
// // //       // Calculate fill height based on percentage
// // //       const fillHeight = (containerHeight * d.percentage) / 100;
// // //       const emptyHeight = containerHeight - fillHeight;
      
// // //       // Clipped area for wave
// // //       const waveGroup = container.append("g")
// // //         .attr("clip-path", `url(#clip-${i})`);
        
// // //       // Wave pattern fill
// // //       waveGroup.append("rect")
// // //         .attr("x", 0)
// // //         .attr("y", emptyHeight)
// // //         .attr("width", containerWidth)
// // //         .attr("height", 0)
// // //         .attr("fill", `url(#wave-${i})`)
// // //         .transition()
// // //         .duration(1500)
// // //         .attr("y", emptyHeight - 10)
// // //         .attr("height", fillHeight + 10);
        
// // //       // Animate wave pattern
// // //       waveGroup.append("rect")
// // //         .attr("x", -200)
// // //         .attr("y", emptyHeight - 20)
// // //         .attr("width", 400)
// // //         .attr("height", fillHeight + 30)
// // //         .attr("fill", `url(#wave-${i})`)
// // //         .style("opacity", 0.7)
// // //         .transition()
// // //         .duration(3000)
// // //         .attr("x", 0)
// // //         .transition()
// // //         .duration(3000)
// // //         .attr("x", -200)
// // //         .on("end", function repeat() {
// // //           d3.select(this)
// // //             .attr("x", -200)
// // //             .transition()
// // //             .duration(3000)
// // //             .attr("x", 0)
// // //             .transition()
// // //             .duration(3000)
// // //             .attr("x", -200)
// // //             .on("end", repeat);
// // //         });
        
// // //       // Status label
// // //       container.append("text")
// // //         .attr("x", containerWidth / 2)
// // //         .attr("y", -15)
// // //         .attr("text-anchor", "middle")
// // //         .style("font-size", "12px")
// // //         .style("font-weight", "bold")
// // //         .style("fill", COLORS[i % COLORS.length])
// // //         .text(d.status);
        
// // //       // Percentage label
// // //       container.append("text")
// // //         .attr("x", containerWidth / 2)
// // //         .attr("y", containerHeight / 2)
// // //         .attr("text-anchor", "middle")
// // //         .attr("dominant-baseline", "middle")
// // //         .style("font-size", "14px")
// // //         .style("font-weight", "bold")
// // //         .style("fill", COLORS[i % COLORS.length])
// // //         .text("0%")
// // //         .transition()
// // //         .duration(1500)
// // //         .tween("text", function() {
// // //           const interpolate = d3.interpolate(0, d.percentage);
// // //           return function(t) {
// // //             this.textContent = `${Math.round(interpolate(t))}%`;
// // //           };
// // //         });
        
// // //       // Count label
// // //       container.append("text")
// // //         .attr("x", containerWidth / 2)
// // //         .attr("y", containerHeight + 20)
// // //         .attr("text-anchor", "middle")
// // //         .style("font-size", "12px")
// // //         .style("fill", MAIN_COLOR)
// // //         .text(`(${d.count})`);
// // //     });
// // //   };

// // //   // Get current date for display
// // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // //     weekday: 'long',
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric'
// // //   });

// // //   // Simple formatter for large numbers
// // //   const formatNumber = (num) => {
// // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // //   };

// // //   // Handle navigation when clicking on cards
// // //   const handleCardClick = (route) => {
// // //     navigate(route);
// // //   };

// // //   // Animation classes for elements
// // //   const fadeInClass = "animate-fadeIn";
// // //   const slideUpClass = "animate-slideUp";

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-6 md:p-10">
// // //       <div className={`mb-10 ${fadeInClass}`}>
// // //         <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
// // //         <div className="flex items-center mt-2">
// // //           <div className="h-1 w-10 bg-blue-600 rounded mr-3"></div>
// // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="relative">
// // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-600 border-t-transparent"></div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {/* Stat Cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
// // //             <div 
// // //               className={`bg-gradient-to-br from-[#14242c] to-[#223c52] rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // //               style={{animationDelay: '100ms'}}
// // //               onClick={() => handleCardClick('/literature-review')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <Mail size={22} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-white/80 mb-1">Unique EMails</h3>
// // //                 <p className="text-2xl font-bold text-white">{formatNumber(stats.eMailCount)}</p>
// // //               </div>
// // //               <ArrowRight size={18} className="text-white/50" />
// // //             </div>

// // //             <div 
// // //               className={`bg-gradient-to-br from-[#14242c] to-[#223c52] rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // //               style={{animationDelay: '200ms'}}
// // //               onClick={() => handleCardClick('/cases')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <FileText size={22} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-white/80 mb-1">Total Articles</h3>
// // //                 <p className="text-2xl font-bold text-white">{formatNumber(stats.articleCount)}</p>
// // //               </div>
// // //               <ArrowRight size={18} className="text-white/50" />
// // //             </div>

// // //             <div 
// // //               className={`bg-gradient-to-br from-[#14242c] to-[#223c52] rounded-lg shadow-md p-6 flex items-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer ${slideUpClass}`}
// // //               style={{animationDelay: '300ms'}}
// // //               onClick={() => handleCardClick('/medical-review')}
// // //             >
// // //               <div className="rounded-full bg-white/20 p-4 mr-5 flex items-center justify-center">
// // //                 <AlertCircle size={22} className="text-white" />
// // //               </div>
// // //               <div className="flex-grow">
// // //                 <h3 className="text-base font-medium text-white/80 mb-1">ICSR / AOI Cases</h3>
// // //                 <p className="text-2xl font-bold text-white">{formatNumber(stats.icsrAoiCount)}</p>
// // //               </div>
// // //               <ArrowRight size={18} className="text-white/50" />
// // //             </div>
// // //           </div>

// // //           {/* Charts Section */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8 mb-10">
// // //             {/* Patient Type Chart */}
// // //             <div className={`bg-white rounded-lg shadow-md p-6 ${fadeInClass}`} style={{animationDelay: '400ms'}}>
// // //               <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // //                 <Users size={18} className="mr-2 text-blue-600" /> Patient Type Distribution
// // //               </h3>
// // //               <div className="h-64" ref={patientTypeChartRef}></div>
// // //             </div>
// // //           </div>

// // //           {/* casuality Validation Chart Section */}
// // //           <div className={`bg-white rounded-lg shadow-md p-6 ${fadeInClass}`} style={{animationDelay: '600ms'}}>
// // //             <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
// // //               <Zap size={18} className="mr-2 text-blue-600" /> casuality Validation (Rule-4)
// // //             </h3>
// // //             <div className="h-64" ref={casualityChartRef}></div>
// // //           </div>
// // //         </>
// // //       )}

// // //       {/* Add global styles for animations */}
// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; }
// // //           to { opacity: 1; }
// // //         }
        
// // //         @keyframes slideUp {
// // //           from { opacity: 0; transform: translateY(20px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }
        
// // //         .animate-fadeIn {
// // //           animation: fadeIn 0.6s ease-out forwards;
// // //         }
        
// // //         .animate-slideUp {
// // //           animation: slideUp 0.6s ease-out forwards;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import React, { useEffect, useState, useRef, useMemo } from 'react';
// // import { Mail, FileText, AlertCircle, Users, ArrowRight, Zap, TrendingUp, ChevronRight } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import DatabaseService from '../services/DatabaseService';
// // import * as d3 from 'd3';

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [stats, setStats] = useState({
// //     eMailCount: 0,
// //     articleCount: 0,
// //     icsrAoiCount: 0
// //   });
  
// //   const [patientTypeData, setPatientTypeData] = useState([]);
// //   const [casualityData, setcasualityData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isChartRendered, setIsChartRendered] = useState(false);
  
// //   // Refs for chart containers
// //   const patientTypeChartRef = useRef(null);
// //   const casualityChartRef = useRef(null);
  
// //   // Primary color and derived palette
// //   const PRIMARY_COLOR = '#14242c';
// //   const COLOR_PALETTE = useMemo(() => [
// //     '#14242c', // Primary dark
// //     '#1d3545', // Lighter shade 1
// //     '#26455e', // Lighter shade 2
// //     '#2f5677', // Lighter shade 3
// //     '#386790', // Lighter shade 4
// //     '#4178a9', // Accent blue
// //   ], []);
  
// //   const ACCENT_COLOR = '#4178a9';  
// //   const LIGHT_BG = '#f8fafc';    // Very light background
// //   const TEXT_COLOR = '#2c3e50'; // Text color
// //   const MUTED_TEXT = '#64748b'; // Muted text color
// //   const BORDER_COLOR = '#e2e8f0'; // Border color

// //   useEffect(() => {
// //     fetchDashboardData();
    
// //     // Add entrance animation for elements
// //     const timer = setTimeout(() => {
// //       setIsChartRendered(true);
// //     }, 300);
    
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // Effect to render charts when data is loaded
// //   useEffect(() => {
// //     if (!loading && patientTypeData.length > 0 && isChartRendered) {
// //       renderPatientTypeChart();
// //       rendercasualityChart();
// //     }
// //   }, [loading, patientTypeData, casualityData, isChartRendered, COLOR_PALETTE]);

// //   // Replace the hardcoded patient type and casuality tracking with dynamic extraction
// //   const fetchDashboardData = async () => {
// //     try {
// //       // Fetch literature data using the same service as in LiteratureReviewContent
// //       const data = await DatabaseService.fetchLiteratureReviews();
      
// //       // Calculate stats
// //       const uniqueEMails = new Set();
// //       let icsrAoiCount = 0;
      
// //       // Dynamic tracking objects for Patient Type and casuality
// //       const patientTypeCounts = {};
// //       const casualityCounts = {};
      
// //       data.forEach(item => {
// //         // Count unique eMails
// //         if (item.Mail) {
// //           uniqueEMails.add(item.Mail);
// //         }
        
// //         // Count ICSR/AOI items
// //         const commentsField = Object.keys(item).find(key => 
// //           key.toLowerCase().includes('comments') && 
// //           (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
// //         );
        
// //         if (commentsField && item[commentsField]) {
// //           const value = item[commentsField].toString().toUpperCase();
// //           if (value.includes('ICSR') || value.includes('AOI')) {
// //             icsrAoiCount++;
// //           }
// //         }
        
// //         // Dynamically track patient type distribution
// //         const patientTypeField = Object.keys(item).find(key => 
// //           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// //         );
        
// //         if (patientTypeField && item[patientTypeField]) {
// //           const value = item[patientTypeField].toString().trim();
// //           // Initialize counter if this value hasn't been seen before
// //           if (!patientTypeCounts[value]) {
// //             patientTypeCounts[value] = 0;
// //           }
// //           patientTypeCounts[value]++;
// //         }
// //         const casualityFieldName = "Casuality Validation (Rule-4)";
// //         // Dynamically track casuality validation
// //         const casualityField = Object.keys(item).find(key => 
// //           key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
// //         );
        
// //         if (item[casualityFieldName] !== undefined) {
// //           let value = item[casualityFieldName].toString().trim();
          
// //           // Handle empty values
// //           if (!value) {
// //             value = "Pending";
// //           }
          
// //           // Initialize counter if this value hasn't been seen before
// //           if (!casualityCounts[value]) {
// //             casualityCounts[value] = 0;
// //           }
// //           casualityCounts[value]++;
// //         }
// //       });
      
// //       // Update stats
// //       setStats({
// //         eMailCount: uniqueEMails.size,
// //         articleCount: data.length,
// //         icsrAoiCount: icsrAoiCount
// //       });
      
// //       // Convert patient type distribution to array for chart
// //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// //         type,
// //         count
// //       }));
// //       setPatientTypeData(patientTypeArray);
      
// //       // Convert casuality validation to array for chart
// //       const casualityArray = Object.entries(casualityCounts).map(([status, count]) => ({
// //         status,
// //         count
// //       }));
// //       setcasualityData(casualityArray);
      
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching dashboard data:", err);
// //       setLoading(false);
// //     }
// //   };

// //   // Render a clean, modern patient type distribution chart
// //   const renderPatientTypeChart = () => {
// //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// //     // Clear previous chart
// //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;

// //     // Create SVG
// //     const svg = d3.select(patientTypeChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     // X scale
// //     const x = d3.scaleBand()
// //       .domain(patientTypeData.map(d => d.type))
// //       .range([0, width])
// //       .padding(0.4);

// //     // Y scale
// //     const y = d3.scaleLinear()
// //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// //       .range([height, 0]);

// //     // Add subtle grid lines
// //     svg.append("g")
// //       .attr("class", "grid")
// //       .attr("opacity", 0.1)
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickSize(-width)
// //         .tickFormat(""))
// //       .select(".domain")
// //       .remove();

// //     // X axis with styled ticks and labels
// //     svg.append("g")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x)
// //         .tickSize(0)) // Remove tick marks
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);
      
// //     // Style x-axis labels
// //     svg.selectAll(".tick text")
// //       .style("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "400")
// //       .style("fill", TEXT_COLOR)
// //       .attr("dy", "1em");

// //     // Y axis
// //     svg.append("g")
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0)) // Remove tick marks
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);
      
// //     // Style y-axis text
// //     svg.selectAll("g.tick text")
// //       .style("font-size", "12px")
// //       .style("fill", MUTED_TEXT);

// //     // Create gradient definitions for bars
// //     const defs = svg.append("defs");
    
// //     // Create a single gradient for all bars
// //     const gradient = defs.append("linearGradient")
// //       .attr("id", "bar-gradient")
// //       .attr("x1", "0%")
// //       .attr("y1", "0%")
// //       .attr("x2", "0%")
// //       .attr("y2", "100%");
      
// //     gradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", ACCENT_COLOR)
// //       .attr("stop-opacity", 1);
      
// //     gradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", PRIMARY_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     // Add subtle shadow for depth
// //     defs.append("filter")
// //       .attr("id", "shadow")
// //       .append("feDropShadow")
// //       .attr("dx", "0")
// //       .attr("dy", "2")
// //       .attr("stdDeviation", "2")
// //       .attr("flood-opacity", "0.2");

// //     // Add bars with animation and interaction
// //     svg.selectAll(".bar")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("rect")
// //       .attr("class", "bar")
// //       .attr("x", d => x(d.type))
// //       .attr("width", x.bandwidth())
// //       .attr("y", height)
// //       .attr("height", 0)
// //       .attr("rx", 4)
// //       .attr("fill", "url(#bar-gradient)")
// //       .attr("filter", "url(#shadow)")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", ACCENT_COLOR);
          
// //         // Show tooltip
// //         tooltip
// //           .style("opacity", 1)
// //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", "url(#bar-gradient)");
          
// //         // Hide tooltip
// //         tooltip.style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => i * 100)
// //       .attr("y", d => y(d.count))
// //       .attr("height", d => height - y(d.count));

// //     // Add value labels on top of bars
// //     svg.selectAll(".value-label")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("text")
// //       .attr("class", "value-label")
// //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// //       .attr("y", d => y(d.count) - 8)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .style("opacity", 0)
// //       .text(d => d.count)
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => 200 + i * 100)
// //       .style("opacity", 1);
      
// //     // Add a simple tooltip
// //     const tooltip = d3.select("body")
// //       .append("div")
// //       .attr("class", "tooltip")
// //       .style("position", "absolute")
// //       .style("padding", "8px")
// //       .style("background", "white")
// //       .style("border-radius", "4px")
// //       .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// //       .style("font-size", "12px")
// //       .style("pointer-events", "none")
// //       .style("opacity", 0)
// //       .style("z-index", 10);
// //   };

// //   // Render a completely redesigned casuality chart - horizontal bar chart with progress indicators
// //  // Render a completely redesigned casuality chart - line chart with points
// // const rendercasualityChart = () => {
// //   if (!casualityChartRef.current || casualityData.length === 0) return;

// //   // Clear previous chart
// //   d3.select(casualityChartRef.current).selectAll("*").remove();

// //   // Sort data by count (descending)
// //   casualityData.sort((a, b) => b.count - a.count);
  
// //   // Calculate total for percentages
// //   const total = casualityData.reduce((sum, d) => sum + d.count, 0);
  
// //   // Add percentage to each item
// //   casualityData.forEach(d => {
// //     d.percentage = (d.count / total) * 100;
// //   });

// //   const margin = { top: 40, right: 60, bottom: 60, left: 60 };
// //   const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// //   const height = 350 - margin.top - margin.bottom;

// //   // Create SVG
// //   const svg = d3.select(casualityChartRef.current)
// //     .append("svg")
// //     .attr("width", width + margin.left + margin.right)
// //     .attr("height", height + margin.top + margin.bottom)
// //     .append("g")
// //     .attr("transform", `translate(${margin.left},${margin.top})`);

// //   // X scale (categorical)
// //   const x = d3.scaleBand()
// //     .domain(casualityData.map(d => d.status))
// //     .range([0, width])
// //     .padding(0.5);

// //   // Y scale (linear)
// //   const y = d3.scaleLinear()
// //     .domain([0, d3.max(casualityData, d => d.percentage) * 1.2])
// //     .range([height, 0]);
  
// //   // Create gradient definitions
// //   const defs = svg.append("defs");
  
// //   // Create gradient for line
// //   const lineGradient = defs.append("linearGradient")
// //     .attr("id", "line-gradient")
// //     .attr("gradientUnits", "userSpaceOnUse")
// //     .attr("x1", 0)
// //     .attr("y1", height)
// //     .attr("x2", 0)
// //     .attr("y2", 0);
    
// //   lineGradient.append("stop")
// //     .attr("offset", "0%")
// //     .attr("stop-color", PRIMARY_COLOR);
    
// //   lineGradient.append("stop")
// //     .attr("offset", "100%")
// //     .attr("stop-color", ACCENT_COLOR);

// //   // Add subtle grid lines
// //   svg.append("g")
// //     .attr("class", "grid")
// //     .attr("opacity", 0.1)
// //     .call(d3.axisLeft(y)
// //       .ticks(5)
// //       .tickSize(-width)
// //       .tickFormat(""))
// //     .select(".domain")
// //     .remove();

// //   // X axis
// //   svg.append("g")
// //     .attr("transform", `translate(0,${height})`)
// //     .call(d3.axisBottom(x)
// //       .tickSize(0))
// //     .select(".domain")
// //     .attr("stroke", BORDER_COLOR);
    
// //   // Style x-axis labels
// //   svg.selectAll(".tick text")
// //     .style("text-anchor", "middle")
// //     .style("font-size", "12px")
// //     .style("font-weight", "400")
// //     .style("fill", TEXT_COLOR)
// //     .attr("dy", "1em")
// //     .attr("transform", "rotate(-15)");

// //   // Y axis
// //   svg.append("g")
// //     .call(d3.axisLeft(y)
// //       .ticks(5)
// //       .tickFormat(d => `${d}%`)
// //       .tickSize(0))
// //     .select(".domain")
// //     .attr("stroke", BORDER_COLOR);
    
// //   // Style y-axis text
// //   svg.selectAll("g.tick text")
// //     .style("font-size", "12px")
// //     .style("fill", MUTED_TEXT);

// //   // Create line generator
// //   const line = d3.line()
// //     .x(d => x(d.status) + x.bandwidth() / 2)
// //     .y(d => y(d.percentage))
// //     .curve(d3.curveMonotoneX); // Smooth curve

// //   // Add the path with gradient
// //   const path = svg.append("path")
// //     .datum(casualityData)
// //     .attr("fill", "none")
// //     .attr("stroke", "url(#line-gradient)")
// //     .attr("stroke-width", 3)
// //     .attr("d", line)
// //     .attr("stroke-dasharray", function() {
// //       return this.getTotalLength();
// //     })
// //     .attr("stroke-dashoffset", function() {
// //       return this.getTotalLength();
// //     });
    
// //   // Animate the line
// //   path.transition()
// //     .duration(1500)
// //     .attr("stroke-dashoffset", 0);
    
// //   // Add area under the line
// //   const area = d3.area()
// //     .x(d => x(d.status) + x.bandwidth() / 2)
// //     .y0(height)
// //     .y1(d => y(d.percentage))
// //     .curve(d3.curveMonotoneX);
    
// //   svg.append("path")
// //     .datum(casualityData)
// //     .attr("fill", "url(#line-gradient)")
// //     .attr("fill-opacity", 0.1)
// //     .attr("d", area);

// //   // Add the points with animated entrance
// //   const points = svg.selectAll(".point")
// //     .data(casualityData)
// //     .enter()
// //     .append("circle")
// //     .attr("class", "point")
// //     .attr("cx", d => x(d.status) + x.bandwidth() / 2)
// //     .attr("cy", d => y(d.percentage))
// //     .attr("r", 0)
// //     .attr("fill", "#ffffff")
// //     .attr("stroke", PRIMARY_COLOR)
// //     .attr("stroke-width", 2)
// //     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))");
    
// //   // Add point animations
// //   points.transition()
// //     .duration(1000)
// //     .delay((d, i) => 1000 + i * 200)
// //     .attr("r", 6);

// //   // Add percentage labels above points
// //   svg.selectAll(".percentage-label")
// //     .data(casualityData)
// //     .enter()
// //     .append("text")
// //     .attr("class", "percentage-label")
// //     .attr("x", d => x(d.status) + x.bandwidth() / 2)
// //     .attr("y", d => y(d.percentage) - 15)
// //     .attr("text-anchor", "middle")
// //     .style("font-size", "12px")
// //     .style("font-weight", "bold")
// //     .style("fill", PRIMARY_COLOR)
// //     .style("opacity", 0)
// //     .text(d => `${Math.round(d.percentage)}%`)
// //     .transition()
// //     .duration(500)
// //     .delay((d, i) => 1200 + i * 200)
// //     .style("opacity", 1);
    
// //   // Add count labels below points
// //   svg.selectAll(".count-label")
// //     .data(casualityData)
// //     .enter()
// //     .append("text")
// //     .attr("class", "count-label")
// //     .attr("x", d => x(d.status) + x.bandwidth() / 2)
// //     .attr("y", d => y(d.percentage) + 20)
// //     .attr("text-anchor", "middle")
// //     .style("font-size", "11px")
// //     .style("fill", MUTED_TEXT)
// //     .style("opacity", 0)
// //     .text(d => `(${d.count})`)
// //     .transition()
// //     .duration(500)
// //     .delay((d, i) => 1400 + i * 200)
// //     .style("opacity", 1);
    
// //   // Add hover interactions
// //   points.on("mouseover", function(event, d) {
// //     d3.select(this)
// //       .transition()
// //       .duration(200)
// //       .attr("r", 8)
// //       .attr("stroke", ACCENT_COLOR);
      
// //     // Highlight label
// //     svg.selectAll(".percentage-label")
// //       .filter(label => label.status === d.status)
// //       .transition()
// //       .duration(200)
// //       .style("font-size", "14px")
// //       .style("fill", ACCENT_COLOR);
// //   })
// //   .on("mouseout", function(event, d) {
// //     d3.select(this)
// //       .transition()
// //       .duration(200)
// //       .attr("r", 6)
// //       .attr("stroke", PRIMARY_COLOR);
      
// //     // Reset label
// //     svg.selectAll(".percentage-label")
// //       .filter(label => label.status === d.status)
// //       .transition()
// //       .duration(200)
// //       .style("font-size", "12px")
// //       .style("fill", PRIMARY_COLOR);
// //   });
// // }; // Get current date for display
// //   const currentDate = new Date().toLocaleDateString('en-US', {
// //     weekday: 'long',
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   // Simple formatter for large numbers
// //   const formatNumber = (num) => {
// //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// //   };

// //   // Handle navigation when clicking on cards
// //   const handleCardClick = (route) => {
// //     navigate(route);
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// //       {/* Header */}
// //       <div className="fadeIn mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// //         <div className="flex items-center mt-2">
// //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="relative">
// //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           {/* Stat Cards - More professional design */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <div 
// //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// //               style={{animationDelay: '100ms'}}
// //               onClick={() => handleCardClick('/literature-review')}
// //             >
// //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// //                 <Mail size={20} className="text-blue-900" />
// //               </div>
// //               <div className="flex-grow">
// //                 <h3 className="text-sm font-medium text-gray-500 mb-1">Unique Emails</h3>
// //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// //               </div>
// //               <ChevronRight size={18} className="text-gray-400" />
// //             </div>

// //             <div 
// //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// //               style={{animationDelay: '200ms'}}
// //               onClick={() => handleCardClick('/cases')}
// //             >
// //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// //                 <FileText size={20} className="text-blue-900" />
// //               </div>
// //               <div className="flex-grow">
// //                 <h3 className="text-sm font-medium text-gray-500 mb-1">Total Articles</h3>
// //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// //               </div>
// //               <ChevronRight size={18} className="text-gray-400" />
// //             </div>

// //             <div 
// //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// //               style={{animationDelay: '300ms'}}
// //               onClick={() => handleCardClick('/medical-review')}
// //             >
// //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// //                 <AlertCircle size={20} className="text-blue-900" />
// //               </div>
// //               <div className="flex-grow">
// //                 <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.icsrAoiCount)}</p>
// //               </div>
// //               <ChevronRight size={18} className="text-gray-400" />
// //             </div>
// //           </div>

// //           {/* Charts Section - Modern, clean design */}
// //           <div className="grid grid-cols-1 gap-8">
// //             {/* Patient Type Chart */}
// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '400ms'}}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <Users size={18} className="mr-2 text-blue-900" /> 
// //                   Patient Type Distribution
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// //                 </div>
// //               </div>
// //               <div className="h-80" ref={patientTypeChartRef}></div>
// //             </div>

// //             {/* Redesigned casuality Chart */}
// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '600ms'}}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <Zap size={18} className="mr-2 text-blue-900" /> 
// //                   casuality Validation (Rule-4)
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">Validation Progress</span>
// //                 </div>
// //               </div>
// //               <div className="h-72" ref={casualityChartRef}></div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       {/* Add cleaner, more modern animations */}
// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
        
// //         @keyframes slideInUp {
// //           from { opacity: 0; transform: translateY(15px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
        
// //         @keyframes growWidth {
// //           from { width: 0; }
// //           to { width: 100%; }
// //         }
        
// //         .fadeIn {
// //           opacity: 0;
// //           animation: fadeIn 0.7s ease-out forwards;
// //         }
        
// //         .slideInUp {
// //           opacity: 0;
// //           animation: slideInUp 0.7s ease-out forwards;
// //         }
        
// //         .growWidth {
// //           width: 0;
// //           animation: growWidth 1s ease-out forwards;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import { Mail, FileText, AlertCircle, Users, ArrowRight, Zap, TrendingUp, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import DatabaseService from '../services/DatabaseService';
// import * as d3 from 'd3';
// const Home = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     eMailCount: 0,
//     articleCount: 0,
//     icsrCount: 0,
//     aoiCount: 0
//   });
  
//   const [patientTypeData, setPatientTypeData] = useState([]);
//   const [casualityData, setcasualityData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isChartRendered, setIsChartRendered] = useState(false);
  
//   // Refs for chart containers
//   const patientTypeChartRef = useRef(null);
//   const casualityChartRef = useRef(null);
  
//   // Primary color and derived palette
//   const PRIMARY_COLOR = '#14242c';
//   const COLOR_PALETTE = useMemo(() => [
//     '#14242c', // Primary dark
//     '#386790', // Lighter shade 1
//     '#26455e', // Lighter shade 2
//     '#2f5677', // Lighter shade 3
//     '#386790', // Lighter shade 4
//     '#4178a9', // Accent blue
//   ], []);
  
//   const ACCENT_COLOR = '#4178a9';  
//   const LIGHT_BG = '#f8fafc';    // Very light background
//   const TEXT_COLOR = '#2c3e50'; // Text color
//   const MUTED_TEXT = '#64748b'; // Muted text color
//   const BORDER_COLOR = '#e2e8f0'; // Border color

//   useEffect(() => {
//     fetchDashboardData();
    
//     // Add entrance animation for elements
//     const timer = setTimeout(() => {
//       setIsChartRendered(true);
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Effect to render charts when data is loaded
//   useEffect(() => {
//     if (!loading && patientTypeData.length > 0 && isChartRendered) {
//       renderPatientTypeChart();
//       rendercasualityChart();
//     }
//   }, [loading, patientTypeData, casualityData, isChartRendered, COLOR_PALETTE]);

//   // Replace the hardcoded patient type and casuality tracking with dynamic extraction
//   const fetchDashboardData = async () => {
//     try {
//       // Fetch literature data using the same service as in LiteratureReviewContent
//       const data = await DatabaseService.fetchLiteratureReviews();
      
//       // Calculate stats
//       const uniqueEMails = new Set();
//       let icsrCount = 0;
//       let aoiCount = 0;
      
//       // Dynamic tracking objects for Patient Type and casuality
//       const patientTypeCounts = {};
//       const casualityCounts = {};
      
//       data.forEach(item => {
//         // Count unique eMails
//         if (item.Mail) {
//           uniqueEMails.add(item.Mail);
//         }
        
//         // Count ICSR and AOI items separately
//         const commentsField = Object.keys(item).find(key => 
//           key.toLowerCase().includes('comments') && 
//           (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
//         );
        
//         if (commentsField && item[commentsField]) {
//           const value = item[commentsField].toString().toUpperCase();
//           if (value.includes('ICSR')) {
//             icsrCount++;
//           }
//           if (value.includes('AOI')) {
//             aoiCount++;
//           }
//         }
        
//         // Dynamically track patient type distribution
//         const patientTypeField = Object.keys(item).find(key => 
//           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
//         );
        
//         if (patientTypeField && item[patientTypeField]) {
//           const value = item[patientTypeField].toString().trim();
//           // Initialize counter if this value hasn't been seen before
//           if (!patientTypeCounts[value]) {
//             patientTypeCounts[value] = 0;
//           }
//           patientTypeCounts[value]++;
//         }
//         const casualityFieldName = "Casuality Validation (Rule-4)";
//         // Dynamically track casuality validation
//         const casualityField = Object.keys(item).find(key => 
//           key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
//         );
        
//         if (item[casualityFieldName] !== undefined) {
//           let value = item[casualityFieldName].toString().trim();
          
//           // Handle empty values
//           if (!value) {
//             value = "Pending";
//           }
          
//           // Initialize counter if this value hasn't been seen before
//           if (!casualityCounts[value]) {
//             casualityCounts[value] = 0;
//           }
//           casualityCounts[value]++;
//         }
//       });
      
//       // Update stats
//       setStats({
//         eMailCount: uniqueEMails.size,
//         articleCount: data.length,
//         icsrCount: icsrCount,
//         aoiCount: aoiCount
//       });
      
//       // Convert patient type distribution to array for chart
//       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
//         type,
//         count
//       }));
//       setPatientTypeData(patientTypeArray);
      
//       // Convert casuality validation to array for chart
//       const casualityArray = Object.entries(casualityCounts).map(([status, count]) => ({
//         status,
//         count
//       }));
//       setcasualityData(casualityArray);
      
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setLoading(false);
//     }
//   };

//   // Render a clean, modern patient type distribution chart
//   const renderPatientTypeChart = () => {
//     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

//     // Clear previous chart
//     d3.select(patientTypeChartRef.current).selectAll("*").remove();

//     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
//     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     // Create SVG
//     const svg = d3.select(patientTypeChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // X scale
//     const x = d3.scaleBand()
//       .domain(patientTypeData.map(d => d.type))
//       .range([0, width])
//       .padding(0.4);

//     // Y scale
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
//       .range([height, 0]);

//     // Add subtle grid lines
//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     // X axis with styled ticks and labels
//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0)) // Remove tick marks
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);
      
//     // Style x-axis labels
//     svg.selectAll(".tick text")
//       .style("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", "1em");

//     // Y axis
//     svg.append("g")
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0)) // Remove tick marks
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);
      
//     // Style y-axis text
//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     // Create gradient definitions for bars
//     const defs = svg.append("defs");
    
//     // Create a single gradient for all bars
//     const gradient = defs.append("linearGradient")
//       .attr("id", "bar-gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "0%")
//       .attr("y2", "100%");
      
//     gradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 1);
      
//     gradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     // Add subtle shadow for depth
//     defs.append("filter")
//       .attr("id", "shadow")
//       .append("feDropShadow")
//       .attr("dx", "0")
//       .attr("dy", "2")
//       .attr("stdDeviation", "2")
//       .attr("flood-opacity", "0.2");

//     // Add bars with animation and interaction
//     svg.selectAll(".bar")
//       .data(patientTypeData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.type))
//       .attr("width", x.bandwidth())
//       .attr("y", height)
//       .attr("height", 0)
//       .attr("rx", 4)
//       .attr("fill", "url(#bar-gradient)")
//       .attr("filter", "url(#shadow)")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", ACCENT_COLOR);
          
//         // Show tooltip
//         tooltip
//           .style("opacity", 1)
//           .html(`<strong>${d.type}:</strong> ${d.count}`)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", "url(#bar-gradient)");
          
//         // Hide tooltip
//         tooltip.style("opacity", 0);
//       })
//       .transition()
//       .duration(800)
//       .delay((d, i) => i * 100)
//       .attr("y", d => y(d.count))
//       .attr("height", d => height - y(d.count));

//     // Add value labels on top of bars
//     svg.selectAll(".value-label")
//       .data(patientTypeData)
//       .enter()
//       .append("text")
//       .attr("class", "value-label")
//       .attr("x", d => x(d.type) + x.bandwidth() / 2)
//       .attr("y", d => y(d.count) - 8)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .style("opacity", 0)
//       .text(d => d.count)
//       .transition()
//       .duration(800)
//       .delay((d, i) => 200 + i * 100)
//       .style("opacity", 1);
      
//     // Add a simple tooltip
//     const tooltip = d3.select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("padding", "8px")
//       .style("background", "white")
//       .style("border-radius", "4px")
//       .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
//       .style("font-size", "12px")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .style("z-index", 10);
//   };

//   // Render a pie chart for casuality data
//   const rendercasualityChart = () => {
//     if (!casualityChartRef.current || casualityData.length === 0) return;

//     // Clear previous chart
//     d3.select(casualityChartRef.current).selectAll("*").remove();

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     // Create SVG
//     const svg = d3.select(casualityChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

//     // Calculate total for percentages
//     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
    
//     // Add percentage to each item
//     casualityData.forEach(d => {
//       d.percentage = (d.count / total) * 100;
//     });

//     // Generate colors from the COLOR_PALETTE
//     const color = d3.scaleOrdinal()
//       .domain(casualityData.map(d => d.status))
//       .range(COLOR_PALETTE);

//     // Create pie layout
//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null);

//     // Generate the arcs
//     const arc = d3.arc()
//       .innerRadius(radius * 0.5) // Create a donut chart
//       .outerRadius(radius * 0.8);

//     // Larger arc for hover effect
//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85);

//     // Arc for labels
//     const labelArc = d3.arc()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9);

//     // Create the pie chart with animation
//     const path = svg.selectAll(".arc")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     // Add the arcs with animation
//     path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.status))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);
          
//         // Show tooltip
//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
//           </div>
//         `;
        
//         d3.select("#casuality-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);
          
//         // Hide tooltip
//         d3.select("#casuality-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     // Add percentage labels inside the pie
//     svg.selectAll(".percentage-label")
//       .data(pie(casualityData))
//       .enter()
//       .append("text")
//       .attr("class", "percentage-label")
//       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", "#000")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => `${Math.round(d.data.percentage)}%`)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", 1);

//     // Add center text
//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("casuality");
      
//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Validation");

//     // Add legend
//     const legend = svg.selectAll(".legend")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => color(d.data.status))
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => d.data.status)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     // Add tooltip div if it doesn't exist
//     if (!document.getElementById("casuality-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "casuality-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   };

//   // Get current date for display
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   // Simple formatter for large numbers
//   const formatNumber = (num) => {
//     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
//   };

//   // Handle navigation when clicking on cards
//   const handleCardClick = (route) => {
//     navigate(route);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
//       {/* Header */}
//       <div className="fadeIn mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
//         <div className="flex items-center mt-2">
//           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
//           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
//             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Stat Cards - Enhanced design with color palette */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div 
//   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//   style={{
//     animationDelay: '100ms',
//     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
//   }}
//   onClick={() => handleCardClick('/literature-review')}
// >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//   <Mail size={20} className="text-white" />
// </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div 
//   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//   style={{
//     animationDelay: '200ms',
//     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
//   }}
//   onClick={() => handleCardClick('/cases')}
// >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//   <FileText size={20} className="text-white" />
// </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             {/* Updated ICSR/AOI Card */}
//             <div 
//   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//   style={{
//     animationDelay: '300ms',
//     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
//   }}
//   onClick={() => handleCardClick('/medical-review')}
// >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//   <AlertCircle size={20} className="text-white" />
// </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
//                   <div className="flex items-center space-x-2">
//                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
//                       Total: {stats.icsrCount + stats.aoiCount}
//                     </span>
//                   </div>
//                   <p className="text-xs text-black-500 mt-1">(For Medical Reviewer)</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>
//           </div>

//           {/* Charts Section - Modern, clean design */}
//           <div className="grid grid-cols-1 gap-8">
//             {/* Patient Type Chart */}
//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '400ms'}}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <Users size={18} className="mr-2 text-blue-900" /> 
//                   Patient Type Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
//                 </div>
//               </div>
//               <div className="h-80" ref={patientTypeChartRef}></div>
//             </div>

//             {/* Redesigned casuality Chart as Pie Chart */}
//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '600ms'}}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <Zap size={18} className="mr-2 text-blue-900" /> 
//                   Casuality Validation (Rule-4)
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">Validation Progress</span>
//                 </div>
//               </div>
//               <div className="h-72" ref={casualityChartRef}></div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Add cleaner, more modern animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes growWidth {
//           from { width: 0; }
//           to { width: 100%; }
//         }
        
//         .fadeIn {
//           opacity: 0;
//           animation: fadeIn 0.7s ease-out forwards;
//         }
        
//         .slideInUp {
//           opacity: 0;
//           animation: slideInUp 0.7s ease-out forwards;
//         }
        
//         .growWidth {
//           width: 0;
//           animation: growWidth 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// // // // // // import React, { useEffect, useState, useRef, useMemo } from 'react';
// // // // // // import { Mail, FileText, AlertCircle, Users, ArrowRight, Zap, TrendingUp, ChevronRight } from 'lucide-react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // import * as d3 from 'd3';

// // // // // // const Home = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [stats, setStats] = useState({
// // // // // //     eMailCount: 0,
// // // // // //     articleCount: 0,
// // // // // //     icsrAoiCount: 0
// // // // // //   });
  
// // // // // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // // // // //   const [casualityData, setcasualityData] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isChartRendered, setIsChartRendered] = useState(false);
  
// // // // // //   // Refs for chart containers
// // // // // //   const patientTypeChartRef = useRef(null);
// // // // // //   const casualityChartRef = useRef(null);
  
// // // // // //   // Primary color and derived palette
// // // // // //   const PRIMARY_COLOR = '#14242c';
// // // // // //   const COLOR_PALETTE = useMemo(() => [
// // // // // //     '#14242c', // Primary dark
// // // // // //     '#1d3545', // Lighter shade 1
// // // // // //     '#26455e', // Lighter shade 2
// // // // // //     '#2f5677', // Lighter shade 3
// // // // // //     '#386790', // Lighter shade 4
// // // // // //     '#4178a9', // Accent blue
// // // // // //   ], []);
  
// // // // // //   const ACCENT_COLOR = '#4178a9';  
// // // // // //   const LIGHT_BG = '#f8fafc';    // Very light background
// // // // // //   const TEXT_COLOR = '#2c3e50'; // Text color
// // // // // //   const MUTED_TEXT = '#64748b'; // Muted text color
// // // // // //   const BORDER_COLOR = '#e2e8f0'; // Border color

// // // // // //   useEffect(() => {
// // // // // //     fetchDashboardData();
    
// // // // // //     // Add entrance animation for elements
// // // // // //     const timer = setTimeout(() => {
// // // // // //       setIsChartRendered(true);
// // // // // //     }, 300);
    
// // // // // //     return () => clearTimeout(timer);
// // // // // //   }, []);

// // // // // //   // Effect to render charts when data is loaded
// // // // // //   useEffect(() => {
// // // // // //     if (!loading && patientTypeData.length > 0 && isChartRendered) {
// // // // // //       renderPatientTypeChart();
// // // // // //       rendercasualityChart();
// // // // // //     }
// // // // // //   }, [loading, patientTypeData, casualityData, isChartRendered, COLOR_PALETTE]);

// // // // // //   // Replace the hardcoded patient type and casuality tracking with dynamic extraction
// // // // // //   const fetchDashboardData = async () => {
// // // // // //     try {
// // // // // //       // Fetch literature data using the same service as in LiteratureReviewContent
// // // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // // //       // Calculate stats
// // // // // //       const uniqueEMails = new Set();
// // // // // //       let icsrAoiCount = 0;
      
// // // // // //       // Dynamic tracking objects for Patient Type and casuality
// // // // // //       const patientTypeCounts = {};
// // // // // //       const casualityCounts = {};
      
// // // // // //       data.forEach(item => {
// // // // // //         // Count unique eMails
// // // // // //         if (item.Mail) {
// // // // // //           uniqueEMails.add(item.Mail);
// // // // // //         }
        
// // // // // //         // Count ICSR/AOI items
// // // // // //         const commentsField = Object.keys(item).find(key => 
// // // // // //           key.toLowerCase().includes('comments') && 
// // // // // //           (key.toLowerCase().includes('icsr') || key.toLowerCase().includes('aoi'))
// // // // // //         );
        
// // // // // //         if (commentsField && item[commentsField]) {
// // // // // //           const value = item[commentsField].toString().toUpperCase();
// // // // // //           if (value.includes('ICSR') || value.includes('AOI')) {
// // // // // //             icsrAoiCount++;
// // // // // //           }
// // // // // //         }
        
// // // // // //         // Dynamically track patient type distribution
// // // // // //         const patientTypeField = Object.keys(item).find(key => 
// // // // // //           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // // // // //         );
        
// // // // // //         if (patientTypeField && item[patientTypeField]) {
// // // // // //           const value = item[patientTypeField].toString().trim();
// // // // // //           // Initialize counter if this value hasn't been seen before
// // // // // //           if (!patientTypeCounts[value]) {
// // // // // //             patientTypeCounts[value] = 0;
// // // // // //           }
// // // // // //           patientTypeCounts[value]++;
// // // // // //         }
// // // // // //         const casualityFieldName = "Casuality Validation (Rule-4)";
// // // // // //         // Dynamically track casuality validation
// // // // // //         const casualityField = Object.keys(item).find(key => 
// // // // // //           key.toLowerCase().includes('casuality') && key.toLowerCase().includes('validation')
// // // // // //         );
        
// // // // // //         if (item[casualityFieldName] !== undefined) {
// // // // // //           let value = item[casualityFieldName].toString().trim();
          
// // // // // //           // Handle empty values
// // // // // //           if (!value) {
// // // // // //             value = "Pending";
// // // // // //           }
          
// // // // // //           // Initialize counter if this value hasn't been seen before
// // // // // //           if (!casualityCounts[value]) {
// // // // // //             casualityCounts[value] = 0;
// // // // // //           }
// // // // // //           casualityCounts[value]++;
// // // // // //         }
// // // // // //       });
      
// // // // // //       // Update stats
// // // // // //       setStats({
// // // // // //         eMailCount: uniqueEMails.size,
// // // // // //         articleCount: data.length,
// // // // // //         icsrAoiCount: icsrAoiCount
// // // // // //       });
      
// // // // // //       // Convert patient type distribution to array for chart
// // // // // //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // // // // //         type,
// // // // // //         count
// // // // // //       }));
// // // // // //       setPatientTypeData(patientTypeArray);
      
// // // // // //       // Convert casuality validation to array for chart
// // // // // //       const casualityArray = Object.entries(casualityCounts).map(([status, count]) => ({
// // // // // //         status,
// // // // // //         count
// // // // // //       }));
// // // // // //       setcasualityData(casualityArray);
      
// // // // // //       setLoading(false);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error fetching dashboard data:", err);
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Render a clean, modern patient type distribution chart
// // // // // //   const renderPatientTypeChart = () => {
// // // // // //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// // // // // //     // Clear previous chart
// // // // // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // // // // //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// // // // // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // // // // //     const height = 350 - margin.top - margin.bottom;

// // // // // //     // Create SVG
// // // // // //     const svg = d3.select(patientTypeChartRef.current)
// // // // // //       .append("svg")
// // // // // //       .attr("width", width + margin.left + margin.right)
// // // // // //       .attr("height", height + margin.top + margin.bottom)
// // // // // //       .append("g")
// // // // // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // // // // //     // X scale
// // // // // //     const x = d3.scaleBand()
// // // // // //       .domain(patientTypeData.map(d => d.type))
// // // // // //       .range([0, width])
// // // // // //       .padding(0.4);

// // // // // //     // Y scale
// // // // // //     const y = d3.scaleLinear()
// // // // // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // // // // //       .range([height, 0]);

// // // // // //     // Add subtle grid lines
// // // // // //     svg.append("g")
// // // // // //       .attr("class", "grid")
// // // // // //       .attr("opacity", 0.1)
// // // // // //       .call(d3.axisLeft(y)
// // // // // //         .ticks(5)
// // // // // //         .tickSize(-width)
// // // // // //         .tickFormat(""))
// // // // // //       .select(".domain")
// // // // // //       .remove();

// // // // // //     // X axis with styled ticks and labels
// // // // // //     svg.append("g")
// // // // // //       .attr("transform", `translate(0,${height})`)
// // // // // //       .call(d3.axisBottom(x)
// // // // // //         .tickSize(0)) // Remove tick marks
// // // // // //       .select(".domain")
// // // // // //       .attr("stroke", BORDER_COLOR);
      
// // // // // //     // Style x-axis labels
// // // // // //     svg.selectAll(".tick text")
// // // // // //       .style("text-anchor", "middle")
// // // // // //       .style("font-size", "12px")
// // // // // //       .style("font-weight", "400")
// // // // // //       .style("fill", TEXT_COLOR)
// // // // // //       .attr("dy", "1em");

// // // // // //     // Y axis
// // // // // //     svg.append("g")
// // // // // //       .call(d3.axisLeft(y)
// // // // // //         .ticks(5)
// // // // // //         .tickFormat(d => d)
// // // // // //         .tickSize(0)) // Remove tick marks
// // // // // //       .select(".domain")
// // // // // //       .attr("stroke", BORDER_COLOR);
      
// // // // // //     // Style y-axis text
// // // // // //     svg.selectAll("g.tick text")
// // // // // //       .style("font-size", "12px")
// // // // // //       .style("fill", MUTED_TEXT);

// // // // // //     // Create gradient definitions for bars
// // // // // //     const defs = svg.append("defs");
    
// // // // // //     // Create a single gradient for all bars
// // // // // //     const gradient = defs.append("linearGradient")
// // // // // //       .attr("id", "bar-gradient")
// // // // // //       .attr("x1", "0%")
// // // // // //       .attr("y1", "0%")
// // // // // //       .attr("x2", "0%")
// // // // // //       .attr("y2", "100%");
      
// // // // // //     gradient.append("stop")
// // // // // //       .attr("offset", "0%")
// // // // // //       .attr("stop-color", ACCENT_COLOR)
// // // // // //       .attr("stop-opacity", 1);
      
// // // // // //     gradient.append("stop")
// // // // // //       .attr("offset", "100%")
// // // // // //       .attr("stop-color", PRIMARY_COLOR)
// // // // // //       .attr("stop-opacity", 0.8);

// // // // // //     // Add subtle shadow for depth
// // // // // //     defs.append("filter")
// // // // // //       .attr("id", "shadow")
// // // // // //       .append("feDropShadow")
// // // // // //       .attr("dx", "0")
// // // // // //       .attr("dy", "2")
// // // // // //       .attr("stdDeviation", "2")
// // // // // //       .attr("flood-opacity", "0.2");

// // // // // //     // Add bars with animation and interaction
// // // // // //     svg.selectAll(".bar")
// // // // // //       .data(patientTypeData)
// // // // // //       .enter()
// // // // // //       .append("rect")
// // // // // //       .attr("class", "bar")
// // // // // //       .attr("x", d => x(d.type))
// // // // // //       .attr("width", x.bandwidth())
// // // // // //       .attr("y", height)
// // // // // //       .attr("height", 0)
// // // // // //       .attr("rx", 4)
// // // // // //       .attr("fill", "url(#bar-gradient)")
// // // // // //       .attr("filter", "url(#shadow)")
// // // // // //       .on("mouseover", function(event, d) {
// // // // // //         d3.select(this)
// // // // // //           .transition()
// // // // // //           .duration(200)
// // // // // //           .attr("fill", ACCENT_COLOR);
          
// // // // // //         // Show tooltip
// // // // // //         tooltip
// // // // // //           .style("opacity", 1)
// // // // // //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// // // // // //           .style("left", `${event.pageX + 10}px`)
// // // // // //           .style("top", `${event.pageY - 28}px`);
// // // // // //       })
// // // // // //       .on("mouseout", function() {
// // // // // //         d3.select(this)
// // // // // //           .transition()
// // // // // //           .duration(200)
// // // // // //           .attr("fill", "url(#bar-gradient)");
          
// // // // // //         // Hide tooltip
// // // // // //         tooltip.style("opacity", 0);
// // // // // //       })
// // // // // //       .transition()
// // // // // //       .duration(800)
// // // // // //       .delay((d, i) => i * 100)
// // // // // //       .attr("y", d => y(d.count))
// // // // // //       .attr("height", d => height - y(d.count));

// // // // // //     // Add value labels on top of bars
// // // // // //     svg.selectAll(".value-label")
// // // // // //       .data(patientTypeData)
// // // // // //       .enter()
// // // // // //       .append("text")
// // // // // //       .attr("class", "value-label")
// // // // // //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// // // // // //       .attr("y", d => y(d.count) - 8)
// // // // // //       .attr("text-anchor", "middle")
// // // // // //       .style("font-size", "12px")
// // // // // //       .style("font-weight", "bold")
// // // // // //       .style("fill", PRIMARY_COLOR)
// // // // // //       .style("opacity", 0)
// // // // // //       .text(d => d.count)
// // // // // //       .transition()
// // // // // //       .duration(800)
// // // // // //       .delay((d, i) => 200 + i * 100)
// // // // // //       .style("opacity", 1);
      
// // // // // //     // Add a simple tooltip
// // // // // //     const tooltip = d3.select("body")
// // // // // //       .append("div")
// // // // // //       .attr("class", "tooltip")
// // // // // //       .style("position", "absolute")
// // // // // //       .style("padding", "8px")
// // // // // //       .style("background", "white")
// // // // // //       .style("border-radius", "4px")
// // // // // //       .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// // // // // //       .style("font-size", "12px")
// // // // // //       .style("pointer-events", "none")
// // // // // //       .style("opacity", 0)
// // // // // //       .style("z-index", 10);
// // // // // //   };

// // // // // //   // Render a completely redesigned casuality chart - horizontal bar chart with progress indicators
// // // // // //  // Render a completely redesigned casuality chart - line chart with points
// // // // // // const rendercasualityChart = () => {
// // // // // //   if (!casualityChartRef.current || casualityData.length === 0) return;

// // // // // //   // Clear previous chart
// // // // // //   d3.select(casualityChartRef.current).selectAll("*").remove();

// // // // // //   // Sort data by count (descending)
// // // // // //   casualityData.sort((a, b) => b.count - a.count);
  
// // // // // //   // Calculate total for percentages
// // // // // //   const total = casualityData.reduce((sum, d) => sum + d.count, 0);
  
// // // // // //   // Add percentage to each item
// // // // // //   casualityData.forEach(d => {
// // // // // //     d.percentage = (d.count / total) * 100;
// // // // // //   });

// // // // // //   const margin = { top: 40, right: 60, bottom: 60, left: 60 };
// // // // // //   const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// // // // // //   const height = 350 - margin.top - margin.bottom;

// // // // // //   // Create SVG
// // // // // //   const svg = d3.select(casualityChartRef.current)
// // // // // //     .append("svg")
// // // // // //     .attr("width", width + margin.left + margin.right)
// // // // // //     .attr("height", height + margin.top + margin.bottom)
// // // // // //     .append("g")
// // // // // //     .attr("transform", `translate(${margin.left},${margin.top})`);

// // // // // //   // X scale (categorical)
// // // // // //   const x = d3.scaleBand()
// // // // // //     .domain(casualityData.map(d => d.status))
// // // // // //     .range([0, width])
// // // // // //     .padding(0.5);

// // // // // //   // Y scale (linear)
// // // // // //   const y = d3.scaleLinear()
// // // // // //     .domain([0, d3.max(casualityData, d => d.percentage) * 1.2])
// // // // // //     .range([height, 0]);
  
// // // // // //   // Create gradient definitions
// // // // // //   const defs = svg.append("defs");
  
// // // // // //   // Create gradient for line
// // // // // //   const lineGradient = defs.append("linearGradient")
// // // // // //     .attr("id", "line-gradient")
// // // // // //     .attr("gradientUnits", "userSpaceOnUse")
// // // // // //     .attr("x1", 0)
// // // // // //     .attr("y1", height)
// // // // // //     .attr("x2", 0)
// // // // // //     .attr("y2", 0);
    
// // // // // //   lineGradient.append("stop")
// // // // // //     .attr("offset", "0%")
// // // // // //     .attr("stop-color", PRIMARY_COLOR);
    
// // // // // //   lineGradient.append("stop")
// // // // // //     .attr("offset", "100%")
// // // // // //     .attr("stop-color", ACCENT_COLOR);

// // // // // //   // Add subtle grid lines
// // // // // //   svg.append("g")
// // // // // //     .attr("class", "grid")
// // // // // //     .attr("opacity", 0.1)
// // // // // //     .call(d3.axisLeft(y)
// // // // // //       .ticks(5)
// // // // // //       .tickSize(-width)
// // // // // //       .tickFormat(""))
// // // // // //     .select(".domain")
// // // // // //     .remove();

// // // // // //   // X axis
// // // // // //   svg.append("g")
// // // // // //     .attr("transform", `translate(0,${height})`)
// // // // // //     .call(d3.axisBottom(x)
// // // // // //       .tickSize(0))
// // // // // //     .select(".domain")
// // // // // //     .attr("stroke", BORDER_COLOR);
    
// // // // // //   // Style x-axis labels
// // // // // //   svg.selectAll(".tick text")
// // // // // //     .style("text-anchor", "middle")
// // // // // //     .style("font-size", "12px")
// // // // // //     .style("font-weight", "400")
// // // // // //     .style("fill", TEXT_COLOR)
// // // // // //     .attr("dy", "1em")
// // // // // //     .attr("transform", "rotate(-15)");

// // // // // //   // Y axis
// // // // // //   svg.append("g")
// // // // // //     .call(d3.axisLeft(y)
// // // // // //       .ticks(5)
// // // // // //       .tickFormat(d => `${d}%`)
// // // // // //       .tickSize(0))
// // // // // //     .select(".domain")
// // // // // //     .attr("stroke", BORDER_COLOR);
    
// // // // // //   // Style y-axis text
// // // // // //   svg.selectAll("g.tick text")
// // // // // //     .style("font-size", "12px")
// // // // // //     .style("fill", MUTED_TEXT);

// // // // // //   // Create line generator
// // // // // //   const line = d3.line()
// // // // // //     .x(d => x(d.status) + x.bandwidth() / 2)
// // // // // //     .y(d => y(d.percentage))
// // // // // //     .curve(d3.curveMonotoneX); // Smooth curve

// // // // // //   // Add the path with gradient
// // // // // //   const path = svg.append("path")
// // // // // //     .datum(casualityData)
// // // // // //     .attr("fill", "none")
// // // // // //     .attr("stroke", "url(#line-gradient)")
// // // // // //     .attr("stroke-width", 3)
// // // // // //     .attr("d", line)
// // // // // //     .attr("stroke-dasharray", function() {
// // // // // //       return this.getTotalLength();
// // // // // //     })
// // // // // //     .attr("stroke-dashoffset", function() {
// // // // // //       return this.getTotalLength();
// // // // // //     });
    
// // // // // //   // Animate the line
// // // // // //   path.transition()
// // // // // //     .duration(1500)
// // // // // //     .attr("stroke-dashoffset", 0);
    
// // // // // //   // Add area under the line
// // // // // //   const area = d3.area()
// // // // // //     .x(d => x(d.status) + x.bandwidth() / 2)
// // // // // //     .y0(height)
// // // // // //     .y1(d => y(d.percentage))
// // // // // //     .curve(d3.curveMonotoneX);
    
// // // // // //   svg.append("path")
// // // // // //     .datum(casualityData)
// // // // // //     .attr("fill", "url(#line-gradient)")
// // // // // //     .attr("fill-opacity", 0.1)
// // // // // //     .attr("d", area);

// // // // // //   // Add the points with animated entrance
// // // // // //   const points = svg.selectAll(".point")
// // // // // //     .data(casualityData)
// // // // // //     .enter()
// // // // // //     .append("circle")
// // // // // //     .attr("class", "point")
// // // // // //     .attr("cx", d => x(d.status) + x.bandwidth() / 2)
// // // // // //     .attr("cy", d => y(d.percentage))
// // // // // //     .attr("r", 0)
// // // // // //     .attr("fill", "#ffffff")
// // // // // //     .attr("stroke", PRIMARY_COLOR)
// // // // // //     .attr("stroke-width", 2)
// // // // // //     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))");
    
// // // // // //   // Add point animations
// // // // // //   points.transition()
// // // // // //     .duration(1000)
// // // // // //     .delay((d, i) => 1000 + i * 200)
// // // // // //     .attr("r", 6);

// // // // // //   // Add percentage labels above points
// // // // // //   svg.selectAll(".percentage-label")
// // // // // //     .data(casualityData)
// // // // // //     .enter()
// // // // // //     .append("text")
// // // // // //     .attr("class", "percentage-label")
// // // // // //     .attr("x", d => x(d.status) + x.bandwidth() / 2)
// // // // // //     .attr("y", d => y(d.percentage) - 15)
// // // // // //     .attr("text-anchor", "middle")
// // // // // //     .style("font-size", "12px")
// // // // // //     .style("font-weight", "bold")
// // // // // //     .style("fill", PRIMARY_COLOR)
// // // // // //     .style("opacity", 0)
// // // // // //     .text(d => `${Math.round(d.percentage)}%`)
// // // // // //     .transition()
// // // // // //     .duration(500)
// // // // // //     .delay((d, i) => 1200 + i * 200)
// // // // // //     .style("opacity", 1);
    
// // // // // //   // Add count labels below points
// // // // // //   svg.selectAll(".count-label")
// // // // // //     .data(casualityData)
// // // // // //     .enter()
// // // // // //     .append("text")
// // // // // //     .attr("class", "count-label")
// // // // // //     .attr("x", d => x(d.status) + x.bandwidth() / 2)
// // // // // //     .attr("y", d => y(d.percentage) + 20)
// // // // // //     .attr("text-anchor", "middle")
// // // // // //     .style("font-size", "11px")
// // // // // //     .style("fill", MUTED_TEXT)
// // // // // //     .style("opacity", 0)
// // // // // //     .text(d => `(${d.count})`)
// // // // // //     .transition()
// // // // // //     .duration(500)
// // // // // //     .delay((d, i) => 1400 + i * 200)
// // // // // //     .style("opacity", 1);
    
// // // // // //   // Add hover interactions
// // // // // //   points.on("mouseover", function(event, d) {
// // // // // //     d3.select(this)
// // // // // //       .transition()
// // // // // //       .duration(200)
// // // // // //       .attr("r", 8)
// // // // // //       .attr("stroke", ACCENT_COLOR);
      
// // // // // //     // Highlight label
// // // // // //     svg.selectAll(".percentage-label")
// // // // // //       .filter(label => label.status === d.status)
// // // // // //       .transition()
// // // // // //       .duration(200)
// // // // // //       .style("font-size", "14px")
// // // // // //       .style("fill", ACCENT_COLOR);
// // // // // //   })
// // // // // //   .on("mouseout", function(event, d) {
// // // // // //     d3.select(this)
// // // // // //       .transition()
// // // // // //       .duration(200)
// // // // // //       .attr("r", 6)
// // // // // //       .attr("stroke", PRIMARY_COLOR);
      
// // // // // //     // Reset label
// // // // // //     svg.selectAll(".percentage-label")
// // // // // //       .filter(label => label.status === d.status)
// // // // // //       .transition()
// // // // // //       .duration(200)
// // // // // //       .style("font-size", "12px")
// // // // // //       .style("fill", PRIMARY_COLOR);
// // // // // //   });
// // // // // // }; // Get current date for display
// // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // //     weekday: 'long',
// // // // // //     year: 'numeric',
// // // // // //     month: 'long',
// // // // // //     day: 'numeric'
// // // // // //   });

// // // // // //   // Simple formatter for large numbers
// // // // // //   const formatNumber = (num) => {
// // // // // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // // // // //   };

// // // // // //   // Handle navigation when clicking on cards
// // // // // //   const handleCardClick = (route) => {
// // // // // //     navigate(route);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// // // // // //       {/* Header */}
// // // // // //       <div className="fadeIn mb-8">
// // // // // //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// // // // // //         <div className="flex items-center mt-2">
// // // // // //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// // // // // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {loading ? (
// // // // // //         <div className="flex justify-center items-center h-64">
// // // // // //           <div className="relative">
// // // // // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // // // // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           {/* Stat Cards - More professional design */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // // // // //             <div 
// // // // // //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// // // // // //               style={{animationDelay: '100ms'}}
// // // // // //               onClick={() => handleCardClick('/literature-review')}
// // // // // //             >
// // // // // //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// // // // // //                 <Mail size={20} className="text-blue-900" />
// // // // // //               </div>
// // // // // //               <div className="flex-grow">
// // // // // //                 <h3 className="text-sm font-medium text-gray-500 mb-1">Unique Emails</h3>
// // // // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// // // // // //               </div>
// // // // // //               <ChevronRight size={18} className="text-gray-400" />
// // // // // //             </div>

// // // // // //             <div 
// // // // // //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// // // // // //               style={{animationDelay: '200ms'}}
// // // // // //               onClick={() => handleCardClick('/cases')}
// // // // // //             >
// // // // // //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// // // // // //                 <FileText size={20} className="text-blue-900" />
// // // // // //               </div>
// // // // // //               <div className="flex-grow">
// // // // // //                 <h3 className="text-sm font-medium text-gray-500 mb-1">Total Articles</h3>
// // // // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// // // // // //               </div>
// // // // // //               <ChevronRight size={18} className="text-gray-400" />
// // // // // //             </div>

// // // // // //             <div 
// // // // // //               className="slideInUp bg-white rounded-lg shadow-sm p-6 flex items-center border-l-4 border-blue-900 transition-all duration-300 transform hover:shadow-md cursor-pointer"
// // // // // //               style={{animationDelay: '300ms'}}
// // // // // //               onClick={() => handleCardClick('/medical-review')}
// // // // // //             >
// // // // // //               <div className="rounded-full bg-blue-900/10 p-3 mr-4">
// // // // // //                 <AlertCircle size={20} className="text-blue-900" />
// // // // // //               </div>
// // // // // //               <div className="flex-grow">
// // // // // //                 <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// // // // // //                 <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.icsrAoiCount)}</p>
// // // // // //               </div>
// // // // // //               <ChevronRight size={18} className="text-gray-400" />
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Charts Section - Modern, clean design */}
// // // // // //           <div className="grid grid-cols-1 gap-8">
// // // // // //             {/* Patient Type Chart */}
// // // // // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '400ms'}}>
// // // // // //               <div className="flex items-center justify-between mb-6">
// // // // // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // // // //                   <Users size={18} className="mr-2 text-blue-900" /> 
// // // // // //                   Patient Type Distribution
// // // // // //                 </h3>
// // // // // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // // // //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="h-80" ref={patientTypeChartRef}></div>
// // // // // //             </div>

// // // // // //             {/* Redesigned casuality Chart */}
// // // // // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '600ms'}}>
// // // // // //               <div className="flex items-center justify-between mb-6">
// // // // // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // // // //                   <Zap size={18} className="mr-2 text-blue-900" /> 
// // // // // //                   casuality Validation (Rule-4)
// // // // // //                 </h3>
// // // // // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // // // //                   <span className="text-xs font-medium text-blue-900">Validation Progress</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="h-72" ref={casualityChartRef}></div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </>
// // // // // //       )}

// // // // // //       {/* Add cleaner, more modern animations */}
// // // // // //       <style jsx>{`
// // // // // //         @keyframes fadeIn {
// // // // // //           from { opacity: 0; }
// // // // // //           to { opacity: 1; }
// // // // // //         }
        
// // // // // //         @keyframes slideInUp {
// // // // // //           from { opacity: 0; transform: translateY(15px); }
// // // // // //           to { opacity: 1; transform: translateY(0); }
// // // // // //         }
        
// // // // // //         @keyframes growWidth {
// // // // // //           from { width: 0; }
// // // // // //           to { width: 100%; }
// // // // // //         }
        
// // // // // //         .fadeIn {
// // // // // //           opacity: 0;
// // // // // //           animation: fadeIn 0.7s ease-out forwards;
// // // // // //         }
        
// // // // // //         .slideInUp {
// // // // // //           opacity: 0;
// // // // // //           animation: slideInUp 0.7s ease-out forwards;
// // // // // //         }
        
// // // // // //         .growWidth {
// // // // // //           width: 0;
// // // // // //           animation: growWidth 1s ease-out forwards;
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Home;
// // // // // import React, { useEffect, useState, useRef, useMemo } from 'react';
// // // // // import { Mail, FileText, AlertCircle, Users, ArrowRight, Zap, TrendingUp, ChevronRight, MessageSquare,Calendar } from 'lucide-react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import DatabaseService from '../services/DatabaseService';
// // // // // import * as d3 from 'd3';
// // // // // const Home = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [stats, setStats] = useState({
// // // // //     eMailCount: 0,
// // // // //     articleCount: 0,
// // // // //     icsrCount: 0,
// // // // //     aoiCount: 0
// // // // //   });
// // // // //   const [startMonth, setStartMonth] = useState(1);
// // // // // const [endMonth, setEndMonth] = useState(12); 
// // // // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // // // //   const [casualityData, setcasualityData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isChartRendered, setIsChartRendered] = useState(false);
// // // // //   const [commentsData, setCommentsData] = useState([]);
// // // // // const [timelineData, setTimelineData] = useState([]);
// // // // // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // // // // const [selectedMonth, setSelectedMonth] = useState(null);
// // // // // const [availableYears, setAvailableYears] = useState([]);
// // // // // const [emailFilter, setEmailFilter] = useState(null);
// // // // //   // Refs for chart containers
// // // // //   const patientTypeChartRef = useRef(null);
// // // // //   const casualityChartRef = useRef(null);
  
// // // // //   // Primary color and derived palette
// // // // //   const PRIMARY_COLOR = '#14242c';
// // // // //   const COLOR_PALETTE = useMemo(() => [
// // // // //     '#14242c', // Primary dark
// // // // //     '#386790', // Lighter shade 1
// // // // //     '#26455e', // Lighter shade 2
// // // // //     '#2f5677', // Lighter shade 3
// // // // //     '#386790', // Lighter shade 4
// // // // //     '#4178a9', // Accent blue
// // // // //   ], []);
  
// // // // //   const ACCENT_COLOR = '#4178a9';  
// // // // //   const LIGHT_BG = '#f8fafc';    // Very light background
// // // // //   const TEXT_COLOR = '#2c3e50'; // Text color
// // // // //   const MUTED_TEXT = '#64748b'; // Muted text color
// // // // //   const BORDER_COLOR = '#e2e8f0'; // Border color

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData();
    
// // // // //     // Add entrance animation for elements
// // // // //     const timer = setTimeout(() => {
// // // // //       setIsChartRendered(true);
// // // // //     }, 300);
    
// // // // //     return () => clearTimeout(timer);
// // // // //   }, []);

// // // // //   // Effect to render charts when data is loaded
// // // // //   useEffect(() => {
// // // // //     if (!loading && patientTypeData.length > 0 && isChartRendered) {
// // // // //       renderPatientTypeChart();
// // // // //       rendercasualityChart();
// // // // //     }
// // // // //   }, [loading, patientTypeData, casualityData, isChartRendered, COLOR_PALETTE]);
// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       // Fetch literature data using the same service as in LiteratureReviewContent
// // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // //       // Calculate stats
// // // // //       const uniqueEMails = new Set();
// // // // //       let icsrCount = 0;
// // // // //       let aoiCount = 0;
      
// // // // //       // Dynamic tracking objects for Patient Type and Comments
// // // // //       const patientTypeCounts = {};
// // // // //       const commentsCounts = {
// // // // //         "ICSR": 0,
// // // // //         "AOI": 0,
// // // // //         "Others": 0
// // // // //       };
      
// // // // //       const timelineDataByMonth = {};
// // // // //       const emailsByDate = {};
// // // // //       const allYears = new Set();
      
// // // // //       data.forEach(item => {
// // // // //         // Count unique eMails
// // // // //         if (item.Mail) {
// // // // //           uniqueEMails.add(item.Mail);
// // // // //         }
        
// // // // //         // Process Validation Processing Date for timeline
// // // // //         const dateField = "Validation Processing Date";
// // // // //         if (item[dateField]) {
// // // // //           const dateStr = item[dateField].toString();
// // // // //           if (dateStr) {
// // // // //             // Handle ISO date format like "2025-04-29T00:00:00.000Z"
// // // // //             const date = new Date(dateStr);
// // // // //             if (!isNaN(date.getTime())) {
// // // // //               const year = date.getFullYear();
// // // // //               const month = date.getMonth();
// // // // //               const yearMonthKey = `${year}-${month}`;
// // // // //               allYears.add(year);
              
// // // // //               // Count articles by month
// // // // //               if (!timelineDataByMonth[yearMonthKey]) {
// // // // //                 timelineDataByMonth[yearMonthKey] = {
// // // // //                   year,
// // // // //                   month: month + 1, // For display: 1-12 instead of 0-11
// // // // //                   count: 0,
// // // // //                   displayDate: date.toLocaleString('default', { month: 'short', year: 'numeric' })
// // // // //                 };
// // // // //               }
// // // // //               timelineDataByMonth[yearMonthKey].count++;
              
// // // // //               // Track emails by date
// // // // //               if (!emailsByDate[yearMonthKey]) {
// // // // //                 emailsByDate[yearMonthKey] = new Set();
// // // // //               }
// // // // //               if (item.Mail) {
// // // // //                 emailsByDate[yearMonthKey].add(item.Mail);
// // // // //               }
// // // // //             }
// // // // //           }
// // // // //         }
        
// // // // //         // Count ICSR and AOI items separately for stats
// // // // //         const commentsField = "Comments (ICSR, AOI, Not selected)";
// // // // //         if (item[commentsField]) {
// // // // //           const value = item[commentsField].toString().toUpperCase();
// // // // //           if (value.includes('ICSR')) {
// // // // //             icsrCount++;
// // // // //             commentsCounts["ICSR"]++;
// // // // //           } else if (value.includes('AOI')) {
// // // // //             aoiCount++;
// // // // //             commentsCounts["AOI"]++;
// // // // //           } else {
// // // // //             commentsCounts["Others"]++;
// // // // //           }
// // // // //         } else {
// // // // //           commentsCounts["Others"]++;
// // // // //         }
        
// // // // //         // Dynamically track patient type distribution
// // // // //         const patientTypeField = Object.keys(item).find(key => 
// // // // //           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // // // //         );
        
// // // // //         if (patientTypeField && item[patientTypeField]) {
// // // // //           const value = item[patientTypeField].toString().trim();
// // // // //           // Initialize counter if this value hasn't been seen before
// // // // //           if (!patientTypeCounts[value]) {
// // // // //             patientTypeCounts[value] = 0;
// // // // //           }
// // // // //           patientTypeCounts[value]++;
// // // // //         }
// // // // //       });
      
// // // // //       // Add email counts to timeline data
// // // // //       Object.keys(timelineDataByMonth).forEach(key => {
// // // // //         timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
// // // // //       });
     
      
// // // // //       // Convert timeline data to array and sort by date
// // // // //       const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
// // // // //         if (a.year !== b.year) return a.year - b.year;
// // // // //         return a.month - b.month;
// // // // //       });
      
// // // // //       // Update stats
// // // // //       setStats({
// // // // //         eMailCount: uniqueEMails.size,
// // // // //         articleCount: data.length,
// // // // //         icsrCount: icsrCount,
// // // // //         aoiCount: aoiCount
// // // // //       });
      
// // // // //       // Convert patient type distribution to array for chart
// // // // //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // // // //         type,
// // // // //         count
// // // // //       }));
// // // // //       setPatientTypeData(patientTypeArray);
      
// // // // //       // Convert comments data to array for chart
// // // // //       const commentsArray = Object.entries(commentsCounts).map(([status, count]) => ({
// // // // //         status,
// // // // //         count
// // // // //       }));
// // // // //       setCommentsData(commentsArray);
      
// // // // //       // Set timeline data and available years
// // // // //       setTimelineData(timelineArray);
// // // // //       setAvailableYears(Array.from(allYears).sort());
      
// // // // //       setLoading(false);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching dashboard data:", err);
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };
// // // // // // Modify the renderCommentsChart function to better display low percentage values
// // // // // const renderCommentsChart = () => {
// // // // //   if (!commentsChartRef.current || commentsData.length === 0) return;

// // // // //   // Clear previous chart
// // // // //   d3.select(commentsChartRef.current).selectAll("*").remove();

// // // // //   const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// // // // //   const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
// // // // //   const height = 370 - margin.top - margin.bottom;
// // // // //   const radius = Math.min(width, height) / 2;

// // // // //   // Create SVG
// // // // //   const svg = d3.select(commentsChartRef.current)
// // // // //     .append("svg")
// // // // //     .attr("width", width + margin.left + margin.right)
// // // // //     .attr("height", height + margin.top + margin.bottom)
// // // // //     .append("g")
// // // // //     .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

// // // // //   // Calculate total for percentages
// // // // //   const total = commentsData.reduce((sum, d) => sum + d.count, 0);
  
// // // // //   // Add percentage to each item
// // // // //   commentsData.forEach(d => {
// // // // //     d.percentage = (d.count / total) * 100;
// // // // //   });

// // // // //   // Generate colors for Comments chart - use specific colors for ICSR and AOI
// // // // //   const commentsColors = {
// // // // //     "ICSR": "#14242c",
// // // // //     "AOI": "#4178a9",
// // // // //     "Others": "#26455e" 
// // // // //   };

// // // // //   // Create pie layout with a minimum angle for small segments
// // // // //   const pie = d3.pie()
// // // // //     .value(d => d.count)
// // // // //     .sort(null)
// // // // //     .padAngle(0.03); // Add padding between segments for better visibility

// // // // //   // Generate the arcs
// // // // //   const arc = d3.arc()
// // // // //     .innerRadius(radius * 0.5) // Create a donut chart
// // // // //     .outerRadius(radius * 0.8)
// // // // //     .cornerRadius(4); // Rounded corners for aesthetics

// // // // //   // Larger arc for hover effect
// // // // //   const hoverArc = d3.arc()
// // // // //     .innerRadius(radius * 0.5)
// // // // //     .outerRadius(radius * 0.85)
// // // // //     .cornerRadius(4);

// // // // //   // Arc for labels
// // // // //   const labelArc = d3.arc()
// // // // //     .innerRadius(radius * 0.9)
// // // // //     .outerRadius(radius * 0.9);

// // // // //   // Create the pie chart with animation
// // // // //   const path = svg.selectAll(".arc")
// // // // //     .data(pie(commentsData))
// // // // //     .enter()
// // // // //     .append("g")
// // // // //     .attr("class", "arc");

// // // // //   // Add the arcs with animation
// // // // //   path.append("path")
// // // // //     .attr("d", arc)
// // // // //     .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // // // //     .attr("stroke", "#fff")
// // // // //     .attr("stroke-width", 2)
// // // // //     .style("opacity", 0.9)
// // // // //     .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // // // //     .on("mouseover", function(event, d) {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("d", hoverArc)
// // // // //         .style("opacity", 1);
        
// // // // //       // Show tooltip
// // // // //       const tooltipContent = `
// // // // //         <div class="p-2">
// // // // //           <div class="font-bold">${d.data.status}</div>
// // // // //           <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
// // // // //         </div>
// // // // //       `;
      
// // // // //       d3.select("#comments-tooltip")
// // // // //         .style("opacity", 1)
// // // // //         .style("left", `${event.pageX + 10}px`)
// // // // //         .style("top", `${event.pageY - 28}px`)
// // // // //         .html(tooltipContent);
// // // // //     })
// // // // //     .on("mouseout", function() {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("d", arc)
// // // // //         .style("opacity", 0.9);
        
// // // // //       // Hide tooltip
// // // // //       d3.select("#comments-tooltip").style("opacity", 0);
// // // // //     })
// // // // //     .transition()
// // // // //     .duration(1000)
// // // // //     .attrTween("d", function(d) {
// // // // //       const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // // // //       return function(t) {
// // // // //         return arc(interpolate(t));
// // // // //       };
// // // // //     });

// // // // //   // Add actual count labels instead of percentages for better visibility of small values
// // // // //   const arcLabels = svg.selectAll(".arc-label")
// // // // //     .data(pie(commentsData))
// // // // //     .enter()
// // // // //     .append("text")
// // // // //     .attr("class", "arc-label")
// // // // //     .attr("transform", d => {
// // // // //       // Adjust position for better visibility
// // // // //       const centroid = arc.centroid(d);
// // // // //       const x = centroid[0] * 1.0;
// // // // //       const y = centroid[1] * 1.0;
// // // // //       return `translate(${x}, ${y})`;
// // // // //     })
// // // // //     .attr("dy", "0.35em")
// // // // //     .attr("text-anchor", "middle")
// // // // //     .style("font-size", "11px")
// // // // //     .style("font-weight", "bold")
// // // // //     .style("fill", "#fff")
// // // // //     .style("pointer-events", "none")
// // // // //     .style("opacity", 0)
// // // // //     .text(d => d.data.count)
// // // // //     .transition()
// // // // //     .delay(1000)
// // // // //     .duration(500)
// // // // //     .style("opacity", d => d.data.percentage < 1 ? 0 : 1); // Hide if percentage is too small

// // // // //   // Add callout lines for small segments
// // // // //   commentsData.forEach((d, i) => {
// // // // //     if (d.status === "ICSR" && d.percentage < 3) {
// // // // //       // Calculate position for the callout
// // // // //       const pieData = pie(commentsData)[i];
// // // // //       const centroid = arc.centroid(pieData);
// // // // //       const x = centroid[0] * 1.5;
// // // // //       const y = centroid[1] * 1.5;
      
// // // // //       // Add callout line
// // // // //       svg.append("line")
// // // // //         .attr("x1", centroid[0])
// // // // //         .attr("y1", centroid[1])
// // // // //         .attr("x2", x)
// // // // //         .attr("y2", y)
// // // // //         .attr("stroke", "#14242c")
// // // // //         .attr("stroke-width", 1.5)
// // // // //         .attr("opacity", 0)
// // // // //         .transition()
// // // // //         .delay(1000)
// // // // //         .duration(500)
// // // // //         .attr("opacity", 1);
      
// // // // //       // Add callout text
// // // // //       svg.append("text")
// // // // //         .attr("x", x + 10)
// // // // //         .attr("y", y)
// // // // //         .attr("text-anchor", "start")
// // // // //         .attr("alignment-baseline", "middle")
// // // // //         .style("font-size", "12px")
// // // // //         .style("font-weight", "bold")
// // // // //         .style("fill", "#14242c")
// // // // //         .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
// // // // //         .attr("opacity", 0)
// // // // //         .transition()
// // // // //         .delay(1100)
// // // // //         .duration(500)
// // // // //         .attr("opacity", 1);
// // // // //     }
// // // // //   });

// // // // //   // Add center text
// // // // //   svg.append("text")
// // // // //     .attr("text-anchor", "middle")
// // // // //     .attr("dy", "-0.5em")
// // // // //     .style("font-size", "14px")
// // // // //     .style("font-weight", "bold")
// // // // //     .style("fill", PRIMARY_COLOR)
// // // // //     .text("Comments");
    
// // // // //   svg.append("text")
// // // // //     .attr("text-anchor", "middle")
// // // // //     .attr("dy", "1em")
// // // // //     .style("font-size", "14px")
// // // // //     .style("font-weight", "bold")
// // // // //     .style("fill", PRIMARY_COLOR)
// // // // //     .text("Distribution");

// // // // //   // Add legend
// // // // //   const legend = svg.selectAll(".legend")
// // // // //     .data(pie(commentsData))
// // // // //     .enter()
// // // // //     .append("g")
// // // // //     .attr("class", "legend")
// // // // //     .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // // // //   legend.append("rect")
// // // // //     .attr("width", 15)
// // // // //     .attr("height", 15)
// // // // //     .attr("rx", 3)
// // // // //     .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // // // //     .style("opacity", 0)
// // // // //     .transition()
// // // // //     .delay((d, i) => 1000 + i * 100)
// // // // //     .duration(500)
// // // // //     .style("opacity", 1);

// // // // //   legend.append("text")
// // // // //     .attr("x", 25)
// // // // //     .attr("y", 12)
// // // // //     .text(d => `${d.data.status}: ${d.data.count}`)
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "medium")
// // // // //     .style("fill", TEXT_COLOR)
// // // // //     .style("opacity", 0)
// // // // //     .transition()
// // // // //     .delay((d, i) => 1100 + i * 100)
// // // // //     .duration(500)
// // // // //     .style("opacity", 1);

// // // // //   // Add tooltip div if it doesn't exist
// // // // //   if (!document.getElementById("comments-tooltip")) {
// // // // //     d3.select("body")
// // // // //       .append("div")
// // // // //       .attr("id", "comments-tooltip")
// // // // //       .style("position", "absolute")
// // // // //       .style("background", "white")
// // // // //       .style("padding", "5px")
// // // // //       .style("border-radius", "5px")
// // // // //       .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // // //       .style("pointer-events", "none")
// // // // //       .style("opacity", 0)
// // // // //       .style("z-index", 10);
// // // // //   }
// // // // // };
  
// // // // //   // 4. Add function to render the timeline chart
// // // // // // Update the renderTimelineChart function to use a line chart// Update the renderTimelineChart function to use the month range
// // // // // const renderTimelineChart = () => {
// // // // //   if (!timelineChartRef.current || timelineData.length === 0) return;

// // // // //   // Filter the data by year
// // // // //   const filteredData = timelineData.filter(d => d.year === selectedYear);
  
// // // // //   // Filter by month range
// // // // //   const monthRangeFilteredData = filteredData.filter(d => {
// // // // //     return d.month >= startMonth && d.month <= endMonth;
// // // // //   });
  
// // // // //   // Further filter by email count if selected
// // // // //   const finalFilteredData = emailFilter !== null
// // // // //     ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
// // // // //     : monthRangeFilteredData;

// // // // //   // If no data after filtering, show a message
// // // // //   if (finalFilteredData.length === 0) {
// // // // //     d3.select(timelineChartRef.current).selectAll("*").remove();
// // // // //     d3.select(timelineChartRef.current)
// // // // //       .append("div")
// // // // //       .attr("class", "flex justify-center items-center h-full")
// // // // //       .append("p")
// // // // //       .attr("class", "text-gray-500")
// // // // //       .text("No data available for the selected filters");
// // // // //     return;
// // // // //   }

// // // // //   // Sort data by date
// // // // //   finalFilteredData.sort((a, b) => {
// // // // //     if (a.year !== b.year) return a.year - b.year;
// // // // //     return a.month - b.month;
// // // // //   });

// // // // //   // The rest of the chart rendering code remains the same as before
// // // // //   // Clear previous chart
// // // // //   d3.select(timelineChartRef.current).selectAll("*").remove();

// // // // //   const margin = { top: 30, right: 80, bottom: 60, left: 60 };
// // // // //   const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
// // // // //   const height = 350 - margin.top - margin.bottom;

// // // // //   // Create SVG
// // // // //   const svg = d3.select(timelineChartRef.current)
// // // // //     .append("svg")
// // // // //     .attr("width", width + margin.left + margin.right)
// // // // //     .attr("height", height + margin.top + margin.bottom)
// // // // //     .append("g")
// // // // //     .attr("transform", `translate(${margin.left},${margin.top})`);

// // // // //   // X scale (time scale for better handling of months)
// // // // //   const x = d3.scalePoint()
// // // // //     .domain(finalFilteredData.map(d => d.displayDate))
// // // // //     .range([0, width])
// // // // //     .padding(0.5);

// // // // //   // Y scale for article count
// // // // //   const yArticles = d3.scaleLinear()
// // // // //     .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
// // // // //     .range([height, 0]);

// // // // //   // Y scale for email count (right axis)
// // // // //   const yEmails = d3.scaleLinear()
// // // // //     .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
// // // // //     .range([height, 0]);

// // // // //   // Add subtle grid lines
// // // // //   svg.append("g")
// // // // //     .attr("class", "grid")
// // // // //     .attr("opacity", 0.1)
// // // // //     .call(d3.axisLeft(yArticles)
// // // // //       .ticks(5)
// // // // //       .tickSize(-width)
// // // // //       .tickFormat(""))
// // // // //     .select(".domain")
// // // // //     .remove();

// // // // //   // X axis with styled ticks and labels
// // // // //   svg.append("g")
// // // // //     .attr("transform", `translate(0,${height})`)
// // // // //     .call(d3.axisBottom(x)
// // // // //       .tickSize(0)) // Remove tick marks
// // // // //     .select(".domain")
// // // // //     .attr("stroke", BORDER_COLOR);
    
// // // // //   // Style x-axis labels
// // // // //   svg.selectAll(".tick text")
// // // // //     .style("text-anchor", "end")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "400")
// // // // //     .style("fill", TEXT_COLOR)
// // // // //     .attr("dy", "0.5em")
// // // // //     .attr("dx", "-0.8em")
// // // // //     .attr("transform", "rotate(-45)");

// // // // //   // Left Y axis for articles
// // // // //   svg.append("g")
// // // // //     .call(d3.axisLeft(yArticles)
// // // // //       .ticks(5)
// // // // //       .tickFormat(d => d)
// // // // //       .tickSize(0)) // Remove tick marks
// // // // //     .select(".domain")
// // // // //     .attr("stroke", BORDER_COLOR);
    
// // // // //   // Add left Y axis label
// // // // //   svg.append("text")
// // // // //     .attr("transform", "rotate(-90)")
// // // // //     .attr("y", -margin.left + 15)
// // // // //     .attr("x", -height / 2)
// // // // //     .attr("text-anchor", "middle")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "bold")
// // // // //     .style("fill", PRIMARY_COLOR)
// // // // //     .text("Articles");

// // // // //   // Right Y axis for emails
// // // // //   svg.append("g")
// // // // //     .attr("transform", `translate(${width}, 0)`)
// // // // //     .call(d3.axisRight(yEmails)
// // // // //       .ticks(5)
// // // // //       .tickFormat(d => d)
// // // // //       .tickSize(0))
// // // // //     .select(".domain")
// // // // //     .attr("stroke", BORDER_COLOR);
    
// // // // //   // Add right Y axis label
// // // // //   svg.append("text")
// // // // //     .attr("transform", "rotate(-90)")
// // // // //     .attr("y", width + margin.right - 15)
// // // // //     .attr("x", -height / 2)
// // // // //     .attr("text-anchor", "middle")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "bold")
// // // // //     .style("fill", ACCENT_COLOR)
// // // // //     .text("Emails");
  
// // // // //   // Style y-axis text
// // // // //   svg.selectAll("g.tick text")
// // // // //     .style("font-size", "12px")
// // // // //     .style("fill", MUTED_TEXT);

// // // // //   // Define line generators
// // // // //   const articleLine = d3.line()
// // // // //     .x(d => x(d.displayDate))
// // // // //     .y(d => yArticles(d.count))
// // // // //     .curve(d3.curveMonotoneX); // Smoother curve

// // // // //   const emailLine = d3.line()
// // // // //     .x(d => x(d.displayDate))
// // // // //     .y(d => yEmails(d.emailCount))
// // // // //     .curve(d3.curveMonotoneX);

// // // // //   // Create gradient definitions
// // // // //   const defs = svg.append("defs");
  
// // // // //   // Create gradient for article line
// // // // //   const articleGradient = defs.append("linearGradient")
// // // // //     .attr("id", "article-line-gradient")
// // // // //     .attr("gradientUnits", "userSpaceOnUse")
// // // // //     .attr("x1", 0)
// // // // //     .attr("y1", 0)
// // // // //     .attr("x2", 0)
// // // // //     .attr("y2", height);
    
// // // // //   articleGradient.append("stop")
// // // // //     .attr("offset", "0%")
// // // // //     .attr("stop-color", PRIMARY_COLOR);
    
// // // // //   articleGradient.append("stop")
// // // // //     .attr("offset", "100%")
// // // // //     .attr("stop-color", PRIMARY_COLOR)
// // // // //     .attr("stop-opacity", 0.8);
  
// // // // //   // Create gradient for email line
// // // // //   const emailGradient = defs.append("linearGradient")
// // // // //     .attr("id", "email-line-gradient")
// // // // //     .attr("gradientUnits", "userSpaceOnUse")
// // // // //     .attr("x1", 0)
// // // // //     .attr("y1", 0)
// // // // //     .attr("x2", 0)
// // // // //     .attr("y2", height);
    
// // // // //   emailGradient.append("stop")
// // // // //     .attr("offset", "0%")
// // // // //     .attr("stop-color", ACCENT_COLOR);
    
// // // // //   emailGradient.append("stop")
// // // // //     .attr("offset", "100%")
// // // // //     .attr("stop-color", ACCENT_COLOR)
// // // // //     .attr("stop-opacity", 0.8);

// // // // //   // Add article line path with animation
// // // // //   const articlePath = svg.append("path")
// // // // //     .datum(finalFilteredData)
// // // // //     .attr("fill", "none")
// // // // //     .attr("stroke", "url(#article-line-gradient)")
// // // // //     .attr("stroke-width", 3)
// // // // //     .attr("stroke-linejoin", "round")
// // // // //     .attr("stroke-linecap", "round")
// // // // //     .attr("d", articleLine)
// // // // //     .style("opacity", 0.8)
// // // // //     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");
  
// // // // //   // Animate the line drawing
// // // // //   const articlePathLength = articlePath.node().getTotalLength();
// // // // //   articlePath
// // // // //     .attr("stroke-dasharray", articlePathLength)
// // // // //     .attr("stroke-dashoffset", articlePathLength)
// // // // //     .transition()
// // // // //     .duration(1500)
// // // // //     .attr("stroke-dashoffset", 0);
  
// // // // //   // Add email line path with animation
// // // // //   const emailPath = svg.append("path")
// // // // //     .datum(finalFilteredData)
// // // // //     .attr("fill", "none")
// // // // //     .attr("stroke", "url(#email-line-gradient)")
// // // // //     .attr("stroke-width", 3)
// // // // //     .attr("stroke-linejoin", "round")
// // // // //     .attr("stroke-linecap", "round")
// // // // //     .attr("stroke-dasharray", "5,5") // Make this a dashed line
// // // // //     .attr("d", emailLine)
// // // // //     .style("opacity", 0.8);
  
// // // // //   // Animate the line drawing
// // // // //   const emailPathLength = emailPath.node().getTotalLength();
// // // // //   emailPath
// // // // //     .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
// // // // //     .attr("stroke-dashoffset", emailPathLength)
// // // // //     .transition()
// // // // //     .duration(1500)
// // // // //     .delay(300)
// // // // //     .attr("stroke-dasharray", "5,5")
// // // // //     .attr("stroke-dashoffset", 0);

// // // // //   // Add circles for article data points
// // // // //   svg.selectAll(".article-point")
// // // // //     .data(finalFilteredData)
// // // // //     .enter()
// // // // //     .append("circle")
// // // // //     .attr("class", "article-point")
// // // // //     .attr("cx", d => x(d.displayDate))
// // // // //     .attr("cy", d => yArticles(d.count))
// // // // //     .attr("r", 5)
// // // // //     .attr("fill", "#fff")
// // // // //     .attr("stroke", PRIMARY_COLOR)
// // // // //     .attr("stroke-width", 2)
// // // // //     .style("opacity", 0)
// // // // //     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // // // //     .on("mouseover", function(event, d) {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("r", 7)
// // // // //         .attr("stroke-width", 3);
        
// // // // //       // Show tooltip
// // // // //       const tooltipContent = `
// // // // //         <div class="p-2">
// // // // //           <div class="font-bold">${d.displayDate}</div>
// // // // //           <div>Articles: ${d.count}</div>
// // // // //           <div>Emails: ${d.emailCount}</div>
// // // // //         </div>
// // // // //       `;
      
// // // // //       d3.select("#timeline-tooltip")
// // // // //         .style("opacity", 1)
// // // // //         .style("left", `${event.pageX + 10}px`)
// // // // //         .style("top", `${event.pageY - 28}px`)
// // // // //         .html(tooltipContent);
// // // // //     })
// // // // //     .on("mouseout", function() {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("r", 5)
// // // // //         .attr("stroke-width", 2);
        
// // // // //       // Hide tooltip
// // // // //       d3.select("#timeline-tooltip").style("opacity", 0);
// // // // //     })
// // // // //     .transition()
// // // // //     .duration(300)
// // // // //     .delay((d, i) => 1500 + i * 50)
// // // // //     .style("opacity", 1);

// // // // //   // Add circles for email data points
// // // // //   svg.selectAll(".email-point")
// // // // //     .data(finalFilteredData)
// // // // //     .enter()
// // // // //     .append("circle")
// // // // //     .attr("class", "email-point")
// // // // //     .attr("cx", d => x(d.displayDate))
// // // // //     .attr("cy", d => yEmails(d.emailCount))
// // // // //     .attr("r", 4)
// // // // //     .attr("fill", "#fff")
// // // // //     .attr("stroke", ACCENT_COLOR)
// // // // //     .attr("stroke-width", 2)
// // // // //     .style("opacity", 0)
// // // // //     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // // // //     .on("mouseover", function(event, d) {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("r", 6)
// // // // //         .attr("stroke-width", 3);
        
// // // // //       // Show tooltip
// // // // //       const tooltipContent = `
// // // // //         <div class="p-2">
// // // // //           <div class="font-bold">${d.displayDate}</div>
// // // // //           <div>Articles: ${d.count}</div>
// // // // //           <div>Emails: ${d.emailCount}</div>
// // // // //         </div>
// // // // //       `;
      
// // // // //       d3.select("#timeline-tooltip")
// // // // //         .style("opacity", 1)
// // // // //         .style("left", `${event.pageX + 10}px`)
// // // // //         .style("top", `${event.pageY - 28}px`)
// // // // //         .html(tooltipContent);
// // // // //     })
// // // // //     .on("mouseout", function() {
// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(200)
// // // // //         .attr("r", 4)
// // // // //         .attr("stroke-width", 2);
        
// // // // //       // Hide tooltip
// // // // //       d3.select("#timeline-tooltip").style("opacity", 0);
// // // // //     })
// // // // //     .transition()
// // // // //     .duration(300)
// // // // //     .delay((d, i) => 1800 + i * 50)
// // // // //     .style("opacity", 1);

// // // // //   // Add legend
// // // // //   const legend = svg.append("g")
// // // // //     .attr("transform", `translate(${width - 120}, 10)`);
    
// // // // //   // Articles legend
// // // // //   legend.append("line")
// // // // //     .attr("x1", 0)
// // // // //     .attr("y1", 0)
// // // // //     .attr("x2", 20)
// // // // //     .attr("y2", 0)
// // // // //     .attr("stroke", PRIMARY_COLOR)
// // // // //     .attr("stroke-width", 3);
    
// // // // //   legend.append("text")
// // // // //     .attr("x", 25)
// // // // //     .attr("y", 4)
// // // // //     .text("Articles")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "medium")
// // // // //     .style("fill", TEXT_COLOR);
    
// // // // //   // Emails legend
// // // // //   legend.append("line")
// // // // //     .attr("x1", 0)
// // // // //     .attr("y1", 20)
// // // // //     .attr("x2", 20)
// // // // //     .attr("y2", 20)
// // // // //     .attr("stroke", ACCENT_COLOR)
// // // // //     .attr("stroke-width", 3)
// // // // //     .attr("stroke-dasharray", "5,5");
    
// // // // //   legend.append("text")
// // // // //     .attr("x", 25)
// // // // //     .attr("y", 24)
// // // // //     .text("Emails")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "medium")
// // // // //     .style("fill", TEXT_COLOR);
    
// // // // //   // Add tooltip div if it doesn't exist
// // // // //   if (!document.getElementById("timeline-tooltip")) {
// // // // //     d3.select("body")
// // // // //       .append("div")
// // // // //       .attr("id", "timeline-tooltip")
// // // // //       .style("position", "absolute")
// // // // //       .style("background", "white")
// // // // //       .style("padding", "5px")
// // // // //       .style("border-radius", "5px")
// // // // //       .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // // //       .style("pointer-events", "none")
// // // // //       .style("opacity", 0)
// // // // //       .style("z-index", 10);
// // // // //   }
// // // // // };
// // // // //   // 5. Add refs and update useEffect
// // // // //   // Add refs for new charts
// // // // //   const commentsChartRef = useRef(null);
// // // // //   const timelineChartRef = useRef(null);
// // // // //   useEffect(() => {
// // // // //     if (!loading && isChartRendered) {
// // // // //       if (patientTypeData.length > 0) {
// // // // //         renderPatientTypeChart();
// // // // //       }
// // // // //       if (commentsData.length > 0) {
// // // // //         renderCommentsChart();
// // // // //       }
// // // // //       if (timelineData.length > 0) {
// // // // //         renderTimelineChart();
// // // // //       }
// // // // //     }
// // // // //   }, [loading, patientTypeData, commentsData, timelineData, isChartRendered, selectedYear, startMonth, endMonth, emailFilter]);

// // // // //   const renderPatientTypeChart = () => {
// // // // //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// // // // //     // Clear previous chart
// // // // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // // // //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// // // // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // // // //     const height = 350 - margin.top - margin.bottom;

// // // // //     // Create SVG
// // // // //     const svg = d3.select(patientTypeChartRef.current)
// // // // //       .append("svg")
// // // // //       .attr("width", width + margin.left + margin.right)
// // // // //       .attr("height", height + margin.top + margin.bottom)
// // // // //       .append("g")
// // // // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // // // //     // X scale
// // // // //     const x = d3.scaleBand()
// // // // //       .domain(patientTypeData.map(d => d.type))
// // // // //       .range([0, width])
// // // // //       .padding(0.4);

// // // // //     // Y scale
// // // // //     const y = d3.scaleLinear()
// // // // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // // // //       .range([height, 0]);

// // // // //     // Add subtle grid lines
// // // // //     svg.append("g")
// // // // //       .attr("class", "grid")
// // // // //       .attr("opacity", 0.1)
// // // // //       .call(d3.axisLeft(y)
// // // // //         .ticks(5)
// // // // //         .tickSize(-width)
// // // // //         .tickFormat(""))
// // // // //       .select(".domain")
// // // // //       .remove();

// // // // //     // X axis with styled ticks and labels
// // // // //     svg.append("g")
// // // // //     .attr("transform", `translate(0,${height})`)
// // // // //     .call(d3.axisBottom(x)
// // // // //       .tickSize(0)) // Remove tick marks
// // // // //     .select(".domain")
// // // // //     .attr("stroke", BORDER_COLOR);
      
// // // // //     // Style x-axis labels
// // // // //     svg.selectAll(".tick text")
// // // // //     .style("text-anchor", "end")
// // // // //     .style("font-size", "12px")
// // // // //     .style("font-weight", "400")
// // // // //     .style("fill", TEXT_COLOR)
// // // // //     .attr("dy", ".5em")
// // // // //     .attr("dx", "-.8em")
// // // // //     .attr("transform", "rotate(-25)");

// // // // //     // Y axis
// // // // //     svg.append("g")
// // // // //       .call(d3.axisLeft(y)
// // // // //         .ticks(5)
// // // // //         .tickFormat(d => d)
// // // // //         .tickSize(0)) // Remove tick marks
// // // // //       .select(".domain")
// // // // //       .attr("stroke", BORDER_COLOR);
      
// // // // //     // Style y-axis text
// // // // //     svg.selectAll("g.tick text")
// // // // //       .style("font-size", "12px")
// // // // //       .style("fill", MUTED_TEXT);

// // // // //     // Create gradient definitions for bars
// // // // //     const defs = svg.append("defs");
    
// // // // //     // Create a single gradient for all bars
// // // // //     const gradient = defs.append("linearGradient")
// // // // //       .attr("id", "bar-gradient")
// // // // //       .attr("x1", "0%")
// // // // //       .attr("y1", "0%")
// // // // //       .attr("x2", "0%")
// // // // //       .attr("y2", "100%");
      
// // // // //     gradient.append("stop")
// // // // //       .attr("offset", "0%")
// // // // //       .attr("stop-color", ACCENT_COLOR)
// // // // //       .attr("stop-opacity", 1);
      
// // // // //     gradient.append("stop")
// // // // //       .attr("offset", "100%")
// // // // //       .attr("stop-color", PRIMARY_COLOR)
// // // // //       .attr("stop-opacity", 0.8);

// // // // //     // Add subtle shadow for depth
// // // // //     defs.append("filter")
// // // // //       .attr("id", "shadow")
// // // // //       .append("feDropShadow")
// // // // //       .attr("dx", "0")
// // // // //       .attr("dy", "2")
// // // // //       .attr("stdDeviation", "2")
// // // // //       .attr("flood-opacity", "0.2");

// // // // //     // Add bars with animation and interaction
// // // // //     svg.selectAll(".bar")
// // // // //       .data(patientTypeData)
// // // // //       .enter()
// // // // //       .append("rect")
// // // // //       .attr("class", "bar")
// // // // //       .attr("x", d => x(d.type))
// // // // //       .attr("width", x.bandwidth())
// // // // //       .attr("y", height)
// // // // //       .attr("height", 0)
// // // // //       .attr("rx", 4)
// // // // //       .attr("fill", "url(#bar-gradient)")
// // // // //       .attr("filter", "url(#shadow)")
// // // // //       .on("mouseover", function(event, d) {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration(200)
// // // // //           .attr("fill", ACCENT_COLOR);
          
// // // // //         // Show tooltip
// // // // //         tooltip
// // // // //           .style("opacity", 1)
// // // // //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// // // // //           .style("left", `${event.pageX + 10}px`)
// // // // //           .style("top", `${event.pageY - 28}px`);
// // // // //       })
// // // // //       .on("mouseout", function() {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration(200)
// // // // //           .attr("fill", "url(#bar-gradient)");
          
// // // // //         // Hide tooltip
// // // // //         tooltip.style("opacity", 0);
// // // // //       })
// // // // //       .transition()
// // // // //       .duration(800)
// // // // //       .delay((d, i) => i * 100)
// // // // //       .attr("y", d => y(d.count))
// // // // //       .attr("height", d => height - y(d.count));

// // // // //     // Add value labels on top of bars
// // // // //     svg.selectAll(".value-label")
// // // // //       .data(patientTypeData)
// // // // //       .enter()
// // // // //       .append("text")
// // // // //       .attr("class", "value-label")
// // // // //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// // // // //       .attr("y", d => y(d.count) - 8)
// // // // //       .attr("text-anchor", "middle")
// // // // //       .style("font-size", "12px")
// // // // //       .style("font-weight", "bold")
// // // // //       .style("fill", PRIMARY_COLOR)
// // // // //       .style("opacity", 0)
// // // // //       .text(d => d.count)
// // // // //       .transition()
// // // // //       .duration(800)
// // // // //       .delay((d, i) => 200 + i * 100)
// // // // //       .style("opacity", 1);
      
// // // // //     // Add a simple tooltip
// // // // //     const tooltip = d3.select("body")
// // // // //       .append("div")
// // // // //       .attr("class", "tooltip")
// // // // //       .style("position", "absolute")
// // // // //       .style("padding", "8px")
// // // // //       .style("background", "white")
// // // // //       .style("border-radius", "4px")
// // // // //       .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// // // // //       .style("font-size", "12px")
// // // // //       .style("pointer-events", "none")
// // // // //       .style("opacity", 0)
// // // // //       .style("z-index", 10);
// // // // //   };

// // // // //   // Render a pie chart for casuality data
// // // // //   const rendercasualityChart = () => {
// // // // //     if (!casualityChartRef.current || casualityData.length === 0) return;

// // // // //     // Clear previous chart
// // // // //     d3.select(casualityChartRef.current).selectAll("*").remove();

// // // // //     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
// // // // //     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// // // // //     const height = 350 - margin.top - margin.bottom;
// // // // //     const radius = Math.min(width, height) / 2;

// // // // //     // Create SVG
// // // // //     const svg = d3.select(casualityChartRef.current)
// // // // //       .append("svg")
// // // // //       .attr("width", width + margin.left + margin.right)
// // // // //       .attr("height", height + margin.top + margin.bottom)
// // // // //       .append("g")
// // // // //       .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

// // // // //     // Calculate total for percentages
// // // // //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
    
// // // // //     // Add percentage to each item
// // // // //     casualityData.forEach(d => {
// // // // //       d.percentage = (d.count / total) * 100;
// // // // //     });

// // // // //     // Generate colors from the COLOR_PALETTE
// // // // //     const color = d3.scaleOrdinal()
// // // // //       .domain(casualityData.map(d => d.status))
// // // // //       .range(COLOR_PALETTE);

// // // // //     // Create pie layout
// // // // //     const pie = d3.pie()
// // // // //       .value(d => d.count)
// // // // //       .sort(null);

// // // // //     // Generate the arcs
// // // // //     const arc = d3.arc()
// // // // //       .innerRadius(radius * 0.5) // Create a donut chart
// // // // //       .outerRadius(radius * 0.8);

// // // // //     // Larger arc for hover effect
// // // // //     const hoverArc = d3.arc()
// // // // //       .innerRadius(radius * 0.5)
// // // // //       .outerRadius(radius * 0.85);

// // // // //     // Arc for labels
// // // // //     const labelArc = d3.arc()
// // // // //       .innerRadius(radius * 0.9)
// // // // //       .outerRadius(radius * 0.9);

// // // // //     // Create the pie chart with animation
// // // // //     const path = svg.selectAll(".arc")
// // // // //       .data(pie(casualityData))
// // // // //       .enter()
// // // // //       .append("g")
// // // // //       .attr("class", "arc");

// // // // //     // Add the arcs with animation
// // // // //     path.append("path")
// // // // //       .attr("d", arc)
// // // // //       .attr("fill", d => color(d.data.status))
// // // // //       .attr("stroke", "#fff")
// // // // //       .attr("stroke-width", 2)
// // // // //       .style("opacity", 0.9)
// // // // //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // // // //       .on("mouseover", function(event, d) {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration(200)
// // // // //           .attr("d", hoverArc)
// // // // //           .style("opacity", 1);
          
// // // // //         // Show tooltip
// // // // //         const tooltipContent = `
// // // // //           <div class="p-2">
// // // // //             <div class="font-bold">${d.data.status}</div>
// // // // //             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
// // // // //           </div>
// // // // //         `;
        
// // // // //         d3.select("#casuality-tooltip")
// // // // //           .style("opacity", 1)
// // // // //           .style("left", `${event.pageX + 10}px`)
// // // // //           .style("top", `${event.pageY - 28}px`)
// // // // //           .html(tooltipContent);
// // // // //       })
// // // // //       .on("mouseout", function() {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration(200)
// // // // //           .attr("d", arc)
// // // // //           .style("opacity", 0.9);
          
// // // // //         // Hide tooltip
// // // // //         d3.select("#casuality-tooltip").style("opacity", 0);
// // // // //       })
// // // // //       .transition()
// // // // //       .duration(1000)
// // // // //       .attrTween("d", function(d) {
// // // // //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // // // //         return function(t) {
// // // // //           return arc(interpolate(t));
// // // // //         };
// // // // //       });

// // // // //     // Add percentage labels inside the pie
// // // // //     svg.selectAll(".percentage-label")
// // // // //       .data(pie(casualityData))
// // // // //       .enter()
// // // // //       .append("text")
// // // // //       .attr("class", "percentage-label")
// // // // //       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
// // // // //       .attr("dy", "0.35em")
// // // // //       .attr("text-anchor", "middle")
// // // // //       .style("font-size", "12px")
// // // // //       .style("font-weight", "bold")
// // // // //       .style("fill", "#000")
// // // // //       .style("pointer-events", "none")
// // // // //       .style("opacity", 0)
// // // // //       .text(d => `${Math.round(d.data.percentage)}%`)
// // // // //       .transition()
// // // // //       .delay(1000)
// // // // //       .duration(500)
// // // // //       .style("opacity", 1);

// // // // //     // Add center text
// // // // //     svg.append("text")
// // // // //       .attr("text-anchor", "middle")
// // // // //       .attr("dy", "-0.5em")
// // // // //       .style("font-size", "14px")
// // // // //       .style("font-weight", "bold")
// // // // //       .style("fill", PRIMARY_COLOR)
// // // // //       .text("casuality");
      
// // // // //     svg.append("text")
// // // // //       .attr("text-anchor", "middle")
// // // // //       .attr("dy", "1em")
// // // // //       .style("font-size", "14px")
// // // // //       .style("font-weight", "bold")
// // // // //       .style("fill", PRIMARY_COLOR)
// // // // //       .text("Validation");

// // // // //     // Add legend
// // // // //     const legend = svg.selectAll(".legend")
// // // // //       .data(pie(casualityData))
// // // // //       .enter()
// // // // //       .append("g")
// // // // //       .attr("class", "legend")
// // // // //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // // // //     legend.append("rect")
// // // // //       .attr("width", 15)
// // // // //       .attr("height", 15)
// // // // //       .attr("rx", 3)
// // // // //       .attr("fill", d => color(d.data.status))
// // // // //       .style("opacity", 0)
// // // // //       .transition()
// // // // //       .delay((d, i) => 1000 + i * 100)
// // // // //       .duration(500)
// // // // //       .style("opacity", 1);

// // // // //     legend.append("text")
// // // // //       .attr("x", 25)
// // // // //       .attr("y", 12)
// // // // //       .text(d => d.data.status)
// // // // //       .style("font-size", "12px")
// // // // //       .style("font-weight", "medium")
// // // // //       .style("fill", TEXT_COLOR)
// // // // //       .style("opacity", 0)
// // // // //       .transition()
// // // // //       .delay((d, i) => 1100 + i * 100)
// // // // //       .duration(500)
// // // // //       .style("opacity", 1);

// // // // //     // Add tooltip div if it doesn't exist
// // // // //     if (!document.getElementById("casuality-tooltip")) {
// // // // //       d3.select("body")
// // // // //         .append("div")
// // // // //         .attr("id", "casuality-tooltip")
// // // // //         .style("position", "absolute")
// // // // //         .style("background", "white")
// // // // //         .style("padding", "5px")
// // // // //         .style("border-radius", "5px")
// // // // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // // //         .style("pointer-events", "none")
// // // // //         .style("opacity", 0)
// // // // //         .style("z-index", 10);
// // // // //     }
// // // // //   };

// // // // //   // Get current date for display
// // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // //     weekday: 'long',
// // // // //     year: 'numeric',
// // // // //     month: 'long',
// // // // //     day: 'numeric'
// // // // //   });

// // // // //   // Simple formatter for large numbers
// // // // //   const formatNumber = (num) => {
// // // // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // // // //   };

// // // // //   // Handle navigation when clicking on cards
// // // // //   const handleCardClick = (route) => {
// // // // //     navigate(route);
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// // // // //       {/* Header */}
// // // // //       <div className="fadeIn mb-8">
// // // // //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// // // // //         <div className="flex items-center mt-2">
// // // // //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// // // // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {loading ? (
// // // // //         <div className="flex justify-center items-center h-64">
// // // // //           <div className="relative">
// // // // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // // // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <>
// // // // //           {/* Stat Cards - Enhanced design with color palette */}
// // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // // // //           <div 
// // // // //   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // // //   style={{
// // // // //     animationDelay: '100ms',
// // // // //     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // // //   }}
// // // // //   onClick={() => handleCardClick('/literature-review')}
// // // // // >
// // // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // // //               <div className="relative z-10 flex items-start">
// // // // //               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // // //   <Mail size={20} className="text-white" />
// // // // // </div>
// // // // //                 <div className="flex-grow">
// // // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
// // // // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// // // // //                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
// // // // //                 </div>
// // // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div 
// // // // //   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // // //   style={{
// // // // //     animationDelay: '200ms',
// // // // //     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // // //   }}
// // // // //   onClick={() => handleCardClick('/cases')}
// // // // // >
// // // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // // //               <div className="relative z-10 flex items-start">
// // // // //               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // // //   <FileText size={20} className="text-white" />
// // // // // </div>
// // // // //                 <div className="flex-grow">
// // // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
// // // // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// // // // //                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
// // // // //                 </div>
// // // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Updated ICSR/AOI Card */}
// // // // //             <div 
// // // // //   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // // //   style={{
// // // // //     animationDelay: '300ms',
// // // // //     background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // // //   }}
// // // // //   onClick={() => handleCardClick('/medical-review')}
// // // // // >
// // // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // // //               <div className="relative z-10 flex items-start">
// // // // //               <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // // //   <AlertCircle size={20} className="text-white" />
// // // // // </div>
// // // // //                 <div className="flex-grow">
// // // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// // // // //                   <div className="flex items-center space-x-2">
// // // // //                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
// // // // //                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
// // // // //                       Total: {stats.icsrCount + stats.aoiCount}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   <p className="text-xs text-black-500 mt-1">(For Medical Reviewer)</p>
// // // // //                 </div>
// // // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// // // // //   {/* Patient Type Chart */}
// // // // //   <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '400ms'}}>
// // // // //     <div className="flex items-center justify-between mb-6">
// // // // //       <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // // //         <Users size={18} className="mr-2 text-blue-900" /> 
// // // // //         Patient Type Distribution
// // // // //       </h3>
// // // // //       <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // // //         <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// // // // //       </div>
// // // // //     </div>
// // // // //     <div className="h-80" ref={patientTypeChartRef}></div>
// // // // //   </div>

// // // // //   {/* Comments Chart */}
// // // // //   <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{animationDelay: '600ms'}}>
// // // // //     <div className="flex items-center justify-between mb-6">
// // // // //       <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // // //         <MessageSquare size={18} className="mr-2 text-blue-900" /> 
// // // // //         Comments Distribution
// // // // //       </h3>
// // // // //       <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // // //         <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
// // // // //       </div>
// // // // //     </div>
// // // // //     <div className="h-72" ref={commentsChartRef}></div>
// // // // //   </div>
// // // // // </div>

// // // // // {/* Timeline Chart with Filters */}
// // // // // <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{animationDelay: '800ms'}}>
// // // // //   <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
// // // // //     <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4 md:mb-0">
// // // // //       <Calendar size={18} className="mr-2 text-blue-900" />
// // // // //       Monthly Article Processing
// // // // //     </h3>
    
// // // // //     <div className="flex flex-wrap gap-2">
// // // // //       {/* Year Filter */}
// // // // //       <select 
// // // // //         className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // // //         value={selectedYear}
// // // // //         onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// // // // //       >
// // // // //         {availableYears.map(year => (
// // // // //           <option key={year} value={year}>{year}</option>
// // // // //         ))}
// // // // //       </select>
      
// // // // //       {/* Start Month Filter */}
// // // // //       <select 
// // // // //         className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // // //         value={startMonth || 1}
// // // // //         onChange={(e) => setStartMonth(parseInt(e.target.value))}
// // // // //       >
// // // // //         <option value={1}>From: January</option>
// // // // //         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // // // //           <option key={month} value={month}>
// // // // //             {new Date(2000, month-1, 1).toLocaleString('default', { month: 'long' })}
// // // // //           </option>
// // // // //         ))}
// // // // //       </select>

// // // // //       {/* End Month Filter */}
// // // // //       <select 
// // // // //         className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // // //         value={endMonth || 12}
// // // // //         onChange={(e) => setEndMonth(parseInt(e.target.value))}
// // // // //       >
// // // // //         <option value={12}>To: December</option>
// // // // //         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // // // //           <option key={month} value={month}>
// // // // //             {new Date(2000, month-1, 1).toLocaleString('default', { month: 'long' })}
// // // // //           </option>
// // // // //         ))}
// // // // //       </select>
      
// // // // //       {/* Email Filter */}
// // // // //       {/* <select 
// // // // //         className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // // //         value={emailFilter || "all"}
// // // // //         onChange={(e) => setEmailFilter(e.target.value === "all" ? null : parseInt(e.target.value))}
// // // // //       >
// // // // //         <option value="all">All Email Counts</option>
// // // // //         {[1, 5, 10, 20].map(count => (
// // // // //           <option key={count} value={count}>≥ {count} Emails</option>
// // // // //         ))}
// // // // //       </select> */}
      
// // // // //       {/* Reset Button */}
// // // // //       <button
// // // // //         className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
// // // // //         onClick={() => {
// // // // //           setSelectedMonth(null);
// // // // //           setEmailFilter(null);
// // // // //         }}
// // // // //       >
// // // // //         Reset Filters
// // // // //       </button>
// // // // //     </div>
// // // // //   </div>
// // // // //   <div className="h-80" ref={timelineChartRef}></div>
// // // // // </div> </>
// // // // //       )}

// // // // //       {/* Add cleaner, more modern animations */}
// // // // //       <style jsx>{`
// // // // //         @keyframes fadeIn {
// // // // //           from { opacity: 0; }
// // // // //           to { opacity: 1; }
// // // // //         }
        
// // // // //         @keyframes slideInUp {
// // // // //           from { opacity: 0; transform: translateY(15px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }
        
// // // // //         @keyframes growWidth {
// // // // //           from { width: 0; }
// // // // //           to { width: 100%; }
// // // // //         }
        
// // // // //         .fadeIn {
// // // // //           opacity: 0;
// // // // //           animation: fadeIn 0.7s ease-out forwards;
// // // // //         }
        
// // // // //         .slideInUp {
// // // // //           opacity: 0;
// // // // //           animation: slideInUp 0.7s ease-out forwards;
// // // // //         }
        
// // // // //         .growWidth {
// // // // //           width: 0;
// // // // //           animation: growWidth 1s ease-out forwards;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Home;
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // import * as d3 from 'd3';
// // // // import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// // // // import DatabaseService from '../services/DatabaseService';

// // // // const Home = () => {
// // // //   const navigate = useNavigate();
// // // //   const [stats, setStats] = useState({
// // // //     eMailCount: 0,
// // // //     articleCount: 0,
// // // //     icsrCount: 0,
// // // //     aoiCount: 0
// // // //   });
// // // //   const [startMonth, setStartMonth] = useState(1); // Default to January
// // // //   const [endMonth, setEndMonth] = useState(12); // Default to December
// // // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // // //   const [casualityData, setCasualityData] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isChartRendered, setIsChartRendered] = useState(false);
// // // //   const [commentsData, setCommentsData] = useState([]);
// // // //   const [timelineData, setTimelineData] = useState([]);
// // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // // //   const [selectedMonth, setSelectedMonth] = useState(null);
// // // //   const [availableYears, setAvailableYears] = useState([]);
// // // //   const [emailFilter, setEmailFilter] = useState(null);

// // // //   // Refs for chart containers
// // // //   const patientTypeChartRef = useRef(null);
// // // //   const casualityChartRef = useRef(null);
// // // //   const commentsChartRef = useRef(null);
// // // //   const timelineChartRef = useRef(null);

// // // //   // Primary color and derived palette
// // // //   const PRIMARY_COLOR = '#14242c';
// // // //   const COLOR_PALETTE = useMemo(() => [
// // // //     '#14242c', // Primary dark
// // // //     '#386790', // Lighter shade 1
// // // //     '#26455e', // Lighter shade 2
// // // //     '#2f5677', // Lighter shade 3
// // // //     '#386790', // Lighter shade 4
// // // //     '#4178a9', // Accent blue
// // // //   ], []);

// // // //   const ACCENT_COLOR = '#4178a9';
// // // //   const LIGHT_BG = '#f8fafc';    // Very light background
// // // //   const TEXT_COLOR = '#2c3e50'; // Text color
// // // //   const MUTED_TEXT = '#64748b'; // Muted text color
// // // //   const BORDER_COLOR = '#e2e8f0'; // Border color

// // // //   useEffect(() => {
// // // //     fetchDashboardData();

// // // //     // Add entrance animation for elements
// // // //     const timer = setTimeout(() => {
// // // //       setIsChartRendered(true);
// // // //     }, 300);

// // // //     return () => clearTimeout(timer);
// // // //   }, [selectedYear, startMonth, endMonth]);

// // // //   // Effect to render charts when data is loaded
// // // //   useEffect(() => {
// // // //     if (!loading && isChartRendered) {
// // // //       if (patientTypeData.length > 0) {
// // // //         renderPatientTypeChart();
// // // //       }
// // // //       if (commentsData.length > 0) {
// // // //         renderCommentsChart();
// // // //       }
// // // //       if (timelineData.length > 0) {
// // // //         renderTimelineChart();
// // // //       }
// // // //     }
// // // //   }, [loading, patientTypeData, commentsData, timelineData, isChartRendered, selectedYear, startMonth, endMonth, emailFilter]);

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       // Fetch literature data
// // // //       const data = await DatabaseService.fetchLiteratureReviews();

// // // //       // Calculate stats
// // // //       const uniqueEMails = new Set();
// // // //       let icsrCount = 0;
// // // //       let aoiCount = 0;

// // // //       // Dynamic tracking objects for Patient Type and Comments
// // // //       const patientTypeCounts = {};
// // // //       const commentsCounts = {
// // // //         "ICSR": 0,
// // // //         "AOI": 0,
// // // //         "Others": 0
// // // //       };

// // // //       const timelineDataByMonth = {};
// // // //       const emailsByDate = {};
// // // //       const allYears = new Set();

// // // //       data.forEach(item => {
// // // //         // Process Validation Processing Date for filtering
// // // //         const dateField = "Validation Processing Date";
// // // //         if (item[dateField]) {
// // // //           const dateStr = item[dateField].toString();
// // // //           if (dateStr) {
// // // //             const date = new Date(dateStr);
// // // //             if (!isNaN(date.getTime())) {
// // // //               const year = date.getFullYear();
// // // //               const month = date.getMonth() + 1; // Convert to 1-12
// // // //               const yearMonthKey = `${year}-${month-1}`;

// // // //               // Apply year and month range filter
// // // //               if (year === selectedYear && month >= startMonth && month <= endMonth) {
// // // //                 // Count unique eMails
// // // //                 if (item.Mail) {
// // // //                   uniqueEMails.add(item.Mail);
// // // //                 }

// // // //                 // Count articles by month
// // // //                 if (!timelineDataByMonth[yearMonthKey]) {
// // // //                   timelineDataByMonth[yearMonthKey] = {
// // // //                     year,
// // // //                     month,
// // // //                     count: 0,
// // // //                     displayDate: date.toLocaleString('default', { month: 'short', year: 'numeric' })
// // // //                   };
// // // //                 }
// // // //                 timelineDataByMonth[yearMonthKey].count++;

// // // //                 // Track emails by date
// // // //                 if (!emailsByDate[yearMonthKey]) {
// // // //                   emailsByDate[yearMonthKey] = new Set();
// // // //                 }
// // // //                 if (item.Mail) {
// // // //                   emailsByDate[yearMonthKey].add(item.Mail);
// // // //                 }

// // // //                 // Count ICSR and AOI items
// // // //                 const commentsField = "Comments (ICSR, AOI, Not selected)";
// // // //                 if (item[commentsField]) {
// // // //                   const value = item[commentsField].toString().toUpperCase();
// // // //                   if (value.includes('ICSR')) {
// // // //                     icsrCount++;
// // // //                     commentsCounts["ICSR"]++;
// // // //                   } else if (value.includes('AOI')) {
// // // //                     aoiCount++;
// // // //                     commentsCounts["AOI"]++;
// // // //                   } else {
// // // //                     commentsCounts["Others"]++;
// // // //                   }
// // // //                 } else {
// // // //                   commentsCounts["Others"]++;
// // // //                 }

// // // //                 // Dynamically track patient type distribution
// // // //                 const patientTypeField = Object.keys(item).find(key =>
// // // //                   key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // // //                 );

// // // //                 if (patientTypeField && item[patientTypeField]) {
// // // //                   const value = item[patientTypeField].toString().trim();
// // // //                   if (!patientTypeCounts[value]) {
// // // //                     patientTypeCounts[value] = 0;
// // // //                   }
// // // //                   patientTypeCounts[value]++;
// // // //                 }
// // // //               }
// // // //               allYears.add(year);
// // // //             }
// // // //           }
// // // //         }
// // // //       });

// // // //       // Add email counts to timeline data
// // // //       Object.keys(timelineDataByMonth).forEach(key => {
// // // //         timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
// // // //       });

// // // //       // Convert timeline data to array and sort by date
// // // //       const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
// // // //         if (a.year !== b.year) return a.year - b.year;
// // // //         return a.month - b.month;
// // // //       });

// // // //       // Update stats
// // // //       setStats({
// // // //         eMailCount: uniqueEMails.size,
// // // //         articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
// // // //         icsrCount: icsrCount,
// // // //         aoiCount: aoiCount
// // // //       });

// // // //       // Convert patient type distribution to array for chart
// // // //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // // //         type,
// // // //         count
// // // //       }));
// // // //       setPatientTypeData(patientTypeArray);

// // // //       // Convert comments data to array for chart
// // // //       const commentsArray = Object.entries(commentsCounts).map(([status, count]) => ({
// // // //         status,
// // // //         count
// // // //       }));
// // // //       setCommentsData(commentsArray);

// // // //       // Set timeline data and available years
// // // //       setTimelineData(timelineArray);
// // // //       setAvailableYears(Array.from(allYears).sort());

// // // //       setLoading(false);
// // // //     } catch (err) {
// // // //       console.error("Error fetching dashboard data:", err);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const renderCommentsChart = () => {
// // // //     if (!commentsChartRef.current || commentsData.length === 0) return;

// // // //     // Clear previous chart
// // // //     d3.select(commentsChartRef.current).selectAll("*").remove();

// // // //     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// // // //     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
// // // //     const height = 370 - margin.top - margin.bottom;
// // // //     const radius = Math.min(width, height) / 2;

// // // //     // Create SVG
// // // //     const svg = d3.select(commentsChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width + margin.left + margin.right)
// // // //       .attr("height", height + margin.top + margin.bottom)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

// // // //     // Calculate total for percentages
// // // //     const total = commentsData.reduce((sum, d) => sum + d.count, 0);

// // // //     // Add percentage to each item
// // // //     commentsData.forEach(d => {
// // // //       d.percentage = (d.count / total) * 100;
// // // //     });

// // // //     // Generate colors for Comments chart
// // // //     const commentsColors = {
// // // //       "ICSR": "#14242c",
// // // //       "AOI": "#4178a9",
// // // //       "Others": "#26455e"
// // // //     };

// // // //     // Create pie layout
// // // //     const pie = d3.pie()
// // // //       .value(d => d.count)
// // // //       .sort(null)
// // // //       .padAngle(0.03);

// // // //     // Generate the arcs
// // // //     const arc = d3.arc()
// // // //       .innerRadius(radius * 0.5)
// // // //       .outerRadius(radius * 0.8)
// // // //       .cornerRadius(4);

// // // //     // Larger arc for hover effect
// // // //     const hoverArc = d3.arc()
// // // //       .innerRadius(radius * 0.5)
// // // //       .outerRadius(radius * 0.85)
// // // //       .cornerRadius(4);

// // // //     // Arc for labels
// // // //     const labelArc = d3.arc()
// // // //       .innerRadius(radius * 0.9)
// // // //       .outerRadius(radius * 0.9);

// // // //     // Create the pie chart
// // // //     const path = svg.selectAll(".arc")
// // // //       .data(pie(commentsData))
// // // //       .enter()
// // // //       .append("g")
// // // //       .attr("class", "arc");

// // // //     // Add the arcs
// // // //     path.append("path")
// // // //       .attr("d", arc)
// // // //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // // //       .attr("stroke", "#fff")
// // // //       .attr("stroke-width", 2)
// // // //       .style("opacity", 0.9)
// // // //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("d", hoverArc)
// // // //           .style("opacity", 1);

// // // //         // Show tooltip
// // // //         const tooltipContent = `
// // // //           <div class="p-2">
// // // //             <div class="font-bold">${d.data.status}</div>
// // // //             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
// // // //           </div>
// // // //         `;

// // // //         d3.select("#comments-tooltip")
// // // //           .style("opacity", 1)
// // // //           .style("left", `${event.pageX + 10}px`)
// // // //           .style("top", `${event.pageY - 28}px`)
// // // //           .html(tooltipContent);
// // // //       })
// // // //       .on("mouseout", function() {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("d", arc)
// // // //           .style("opacity", 0.9);

// // // //         // Hide tooltip
// // // //         d3.select("#comments-tooltip").style("opacity", 0);
// // // //       })
// // // //       .transition()
// // // //       .duration(1000)
// // // //       .attrTween("d", function(d) {
// // // //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // // //         return function(t) {
// // // //           return arc(interpolate(t));
// // // //         };
// // // //       });

// // // //     // Add count labels
// // // //     const arcLabels = svg.selectAll(".arc-label")
// // // //       .data(pie(commentsData))
// // // //       .enter()
// // // //       .append("text")
// // // //       .attr("class", "arc-label")
// // // //       .attr("transform", d => {
// // // //         const centroid = arc.centroid(d);
// // // //         const x = centroid[0] * 1.0;
// // // //         const y = centroid[1] * 1.0;
// // // //         return `translate(${x}, ${y})`;
// // // //       })
// // // //       .attr("dy", "0.35em")
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "11px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", "#fff")
// // // //       .style("pointer-events", "none")
// // // //       .style("opacity", 0)
// // // //       .text(d => d.data.count)
// // // //       .transition()
// // // //       .delay(1000)
// // // //       .duration(500)
// // // //       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

// // // //     // Add callout lines for small segments
// // // //     commentsData.forEach((d, i) => {
// // // //       if (d.status === "ICSR" && d.percentage < 3) {
// // // //         const pieData = pie(commentsData)[i];
// // // //         const centroid = arc.centroid(pieData);
// // // //         const x = centroid[0] * 1.5;
// // // //         const y = centroid[1] * 1.5;

// // // //         svg.append("line")
// // // //           .attr("x1", centroid[0])
// // // //           .attr("y1", centroid[1])
// // // //           .attr("x2", x)
// // // //           .attr("y2", y)
// // // //           .attr("stroke", "#14242c")
// // // //           .attr("stroke-width", 1.5)
// // // //           .attr("opacity", 0)
// // // //           .transition()
// // // //           .delay(1000)
// // // //           .duration(500)
// // // //           .attr("opacity", 1);

// // // //         svg.append("text")
// // // //           .attr("x", x + 10)
// // // //           .attr("y", y)
// // // //           .attr("text-anchor", "start")
// // // //           .attr("alignment-baseline", "middle")
// // // //           .style("font-size", "12px")
// // // //           .style("font-weight", "bold")
// // // //           .style("fill", "#14242c")
// // // //           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
// // // //           .attr("opacity", 0)
// // // //           .transition()
// // // //           .delay(1100)
// // // //           .duration(500)
// // // //           .attr("opacity", 1);
// // // //       }
// // // //     });

// // // //     // Add center text
// // // //     svg.append("text")
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("dy", "-0.5em")
// // // //       .style("font-size", "14px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .text("Comments");

// // // //     svg.append("text")
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("dy", "1em")
// // // //       .style("font-size", "14px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .text("Distribution");

// // // //     // Add legend
// // // //     const legend = svg.selectAll(".legend")
// // // //       .data(pie(commentsData))
// // // //       .enter()
// // // //       .append("g")
// // // //       .attr("class", "legend")
// // // //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // // //     legend.append("rect")
// // // //       .attr("width", 15)
// // // //       .attr("height", 15)
// // // //       .attr("rx", 3)
// // // //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // // //       .style("opacity", 0)
// // // //       .transition()
// // // //       .delay((d, i) => 1000 + i * 100)
// // // //       .duration(500)
// // // //       .style("opacity", 1);

// // // //     legend.append("text")
// // // //       .attr("x", 25)
// // // //       .attr("y", 12)
// // // //       .text(d => `${d.data.status}: ${d.data.count}`)
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "medium")
// // // //       .style("fill", TEXT_COLOR)
// // // //       .style("opacity", 0)
// // // //       .transition()
// // // //       .delay((d, i) => 1100 + i * 100)
// // // //       .duration(500)
// // // //       .style("opacity", 1);

// // // //     // Add tooltip div
// // // //     if (!document.getElementById("comments-tooltip")) {
// // // //       d3.select("body")
// // // //         .append("div")
// // // //         .attr("id", "comments-tooltip")
// // // //         .style("position", "absolute")
// // // //         .style("background", "white")
// // // //         .style("padding", "5px")
// // // //         .style("border-radius", "5px")
// // // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // //         .style("pointer-events", "none")
// // // //         .style("opacity", 0)
// // // //         .style("z-index", 10);
// // // //     }
// // // //   };

// // // //   const renderTimelineChart = () => {
// // // //     if (!timelineChartRef.current || timelineData.length === 0) return;

// // // //     // Filter the data by year
// // // //     const filteredData = timelineData.filter(d => d.year === selectedYear);

// // // //     // Filter by month range
// // // //     const monthRangeFilteredData = filteredData.filter(d => {
// // // //       return d.month >= startMonth && d.month <= endMonth;
// // // //     });

// // // //     // Further filter by email count if selected
// // // //     const finalFilteredData = emailFilter !== null
// // // //       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
// // // //       : monthRangeFilteredData;

// // // //     // If no data after filtering, show a message
// // // //     if (finalFilteredData.length === 0) {
// // // //       d3.select(timelineChartRef.current).selectAll("*").remove();
// // // //       d3.select(timelineChartRef.current)
// // // //         .append("div")
// // // //         .attr("class", "flex justify-center items-center h-full")
// // // //         .append("p")
// // // //         .attr("class", "text-gray-500")
// // // //         .text("No data available for the selected filters");
// // // //       return;
// // // //     }

// // // //     // Sort data by date
// // // //     finalFilteredData.sort((a, b) => {
// // // //       if (a.year !== b.year) return a.year - b.year;
// // // //       return a.month - b.month;
// // // //     });

// // // //     // Clear previous chart
// // // //     d3.select(timelineChartRef.current).selectAll("*").remove();

// // // //     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
// // // //     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
// // // //     const height = 350 - margin.top - margin.bottom;

// // // //     // Create SVG
// // // //     const svg = d3.select(timelineChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width + margin.left + margin.right)
// // // //       .attr("height", height + margin.top + margin.bottom)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // // //     // X scale
// // // //     const x = d3.scalePoint()
// // // //       .domain(finalFilteredData.map(d => d.displayDate))
// // // //       .range([0, width])
// // // //       .padding(0.5);

// // // //     // Y scale for article count
// // // //     const yArticles = d3.scaleLinear()
// // // //       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
// // // //       .range([height, 0]);

// // // //     // Y scale for email count
// // // //     const yEmails = d3.scaleLinear()
// // // //       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
// // // //       .range([height, 0]);

// // // //     // Add grid lines
// // // //     svg.append("g")
// // // //       .attr("class", "grid")
// // // //       .attr("opacity", 0.1)
// // // //       .call(d3.axisLeft(yArticles)
// // // //         .ticks(5)
// // // //         .tickSize(-width)
// // // //         .tickFormat(""))
// // // //       .select(".domain")
// // // //       .remove();

// // // //     // X axis
// // // //     svg.append("g")
// // // //       .attr("transform", `translate(0,${height})`)
// // // //       .call(d3.axisBottom(x)
// // // //         .tickSize(0))
// // // //       .select(".domain")
// // // //       .attr("stroke", BORDER_COLOR);

// // // //     // Style x-axis labels
// // // //     svg.selectAll(".tick text")
// // // //       .style("text-anchor", "end")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "400")
// // // //       .style("fill", TEXT_COLOR)
// // // //       .attr("dy", "0.5em")
// // // //       .attr("dx", "-0.8em")
// // // //       .attr("transform", "rotate(-45)");

// // // //     // Left Y axis for articles
// // // //     svg.append("g")
// // // //       .call(d3.axisLeft(yArticles)
// // // //         .ticks(5)
// // // //         .tickFormat(d => d)
// // // //         .tickSize(0))
// // // //       .select(".domain")
// // // //       .attr("stroke", BORDER_COLOR);

// // // //     // Add left Y axis label
// // // //     svg.append("text")
// // // //       .attr("transform", "rotate(-90)")
// // // //       .attr("y", -margin.left + 15)
// // // //       .attr("x", -height / 2)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .text("Articles");

// // // //     // Right Y axis for emails
// // // //     svg.append("g")
// // // //       .attr("transform", `translate(${width}, 0)`)
// // // //       .call(d3.axisRight(yEmails)
// // // //         .ticks(5)
// // // //         .tickFormat(d => d)
// // // //         .tickSize(0))
// // // //       .select(".domain")
// // // //       .attr("stroke", BORDER_COLOR);

// // // //     // Add right Y axis label
// // // //     svg.append("text")
// // // //       .attr("transform", "rotate(-90)")
// // // //       .attr("y", width + margin.right - 15)
// // // //       .attr("x", -height / 2)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", ACCENT_COLOR)
// // // //       .text("Emails");

// // // //     // Style y-axis text
// // // //     svg.selectAll("g.tick text")
// // // //       .style("font-size", "12px")
// // // //       .style("fill", MUTED_TEXT);

// // // //     // Define line generators
// // // //     const articleLine = d3.line()
// // // //       .x(d => x(d.displayDate))
// // // //       .y(d => yArticles(d.count))
// // // //       .curve(d3.curveMonotoneX);

// // // //     const emailLine = d3.line()
// // // //       .x(d => x(d.displayDate))
// // // //       .y(d => yEmails(d.emailCount))
// // // //       .curve(d3.curveMonotoneX);

// // // //     // Create gradient definitions
// // // //     const defs = svg.append("defs");

// // // //     // Create gradient for article line
// // // //     const articleGradient = defs.append("linearGradient")
// // // //       .attr("id", "article-line-gradient")
// // // //       .attr("gradientUnits", "userSpaceOnUse")
// // // //       .attr("x1", 0)
// // // //       .attr("y1", 0)
// // // //       .attr("x2", 0)
// // // //       .attr("y2", height);

// // // //     articleGradient.append("stop")
// // // //       .attr("offset", "0%")
// // // //       .attr("stop-color", PRIMARY_COLOR);

// // // //     articleGradient.append("stop")
// // // //       .attr("offset", "100%")
// // // //       .attr("stop-color", PRIMARY_COLOR)
// // // //       .attr("stop-opacity", 0.8);

// // // //     // Create gradient for email line
// // // //     const emailGradient = defs.append("linearGradient")
// // // //       .attr("id", "email-line-gradient")
// // // //       .attr("gradientUnits", "userSpaceOnUse")
// // // //       .attr("x1", 0)
// // // //       .attr("y1", 0)
// // // //       .attr("x2", 0)
// // // //       .attr("y2", height);

// // // //     emailGradient.append("stop")
// // // //       .attr("offset", "0%")
// // // //       .attr("stop-color", ACCENT_COLOR);

// // // //     emailGradient.append("stop")
// // // //       .attr("offset", "100%")
// // // //       .attr("stop-color", ACCENT_COLOR)
// // // //       .attr("stop-opacity", 0.8);

// // // //     // Add article line path
// // // //     const articlePath = svg.append("path")
// // // //       .datum(finalFilteredData)
// // // //       .attr("fill", "none")
// // // //       .attr("stroke", "url(#article-line-gradient)")
// // // //       .attr("stroke-width", 3)
// // // //       .attr("stroke-linejoin", "round")
// // // //       .attr("stroke-linecap", "round")
// // // //       .attr("d", articleLine)
// // // //       .style("opacity", 0.8)
// // // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

// // // //     // Animate the line drawing
// // // //     const articlePathLength = articlePath.node().getTotalLength();
// // // //     articlePath
// // // //       .attr("stroke-dasharray", articlePathLength)
// // // //       .attr("stroke-dashoffset", articlePathLength)
// // // //       .transition()
// // // //       .duration(1500)
// // // //       .attr("stroke-dashoffset", 0);

// // // //     // Add email line path
// // // //     const emailPath = svg.append("path")
// // // //       .datum(finalFilteredData)
// // // //       .attr("fill", "none")
// // // //       .attr("stroke", "url(#email-line-gradient)")
// // // //       .attr("stroke-width", 3)
// // // //       .attr("stroke-linejoin", "round")
// // // //       .attr("stroke-linecap", "round")
// // // //       .attr("stroke-dasharray", "5,5")
// // // //       .attr("d", emailLine)
// // // //       .style("opacity", 0.8);

// // // //     // Animate the line drawing
// // // //     const emailPathLength = emailPath.node().getTotalLength();
// // // //     emailPath
// // // //       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
// // // //       .attr("stroke-dashoffset", emailPathLength)
// // // //       .transition()
// // // //       .duration(1500)
// // // //       .delay(300)
// // // //       .attr("stroke-dasharray", "5,5")
// // // //       .attr("stroke-dashoffset", 0);

// // // //     // Add circles for article data points
// // // //     svg.selectAll(".article-point")
// // // //       .data(finalFilteredData)
// // // //       .enter()
// // // //       .append("circle")
// // // //       .attr("class", "article-point")
// // // //       .attr("cx", d => x(d.displayDate))
// // // //       .attr("cy", d => yArticles(d.count))
// // // //       .attr("r", 5)
// // // //       .attr("fill", "#fff")
// // // //       .attr("stroke", PRIMARY_COLOR)
// // // //       .attr("stroke-width", 2)
// // // //       .style("opacity", 0)
// // // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("r", 7)
// // // //           .attr("stroke-width", 3);

// // // //         // Show tooltip
// // // //         const tooltipContent = `
// // // //           <div class="p-2">
// // // //             <div class="font-bold">${d.displayDate}</div>
// // // //             <div>Articles: ${d.count}</div>
// // // //             <div>Emails: ${d.emailCount}</div>
// // // //           </div>
// // // //         `;

// // // //         d3.select("#timeline-tooltip")
// // // //           .style("opacity", 1)
// // // //           .style("left", `${event.pageX + 10}px`)
// // // //           .style("top", `${event.pageY - 28}px`)
// // // //           .html(tooltipContent);
// // // //       })
// // // //       .on("mouseout", function() {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("r", 5)
// // // //           .attr("stroke-width", 2);

// // // //         // Hide tooltip
// // // //         d3.select("#timeline-tooltip").style("opacity", 0);
// // // //       })
// // // //       .transition()
// // // //       .duration(300)
// // // //       .delay((d, i) => 1500 + i * 50)
// // // //       .style("opacity", 1);

// // // //     // Add circles for email data points
// // // //     svg.selectAll(".email-point")
// // // //       .data(finalFilteredData)
// // // //       .enter()
// // // //       .append("circle")
// // // //       .attr("class", "email-point")
// // // //       .attr("cx", d => x(d.displayDate))
// // // //       .attr("cy", d => yEmails(d.emailCount))
// // // //       .attr("r", 4)
// // // //       .attr("fill", "#fff")
// // // //       .attr("stroke", ACCENT_COLOR)
// // // //       .attr("stroke-width", 2)
// // // //       .style("opacity", 0)
// // // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("r", 6)
// // // //           .attr("stroke-width", 3);

// // // //         // Show tooltip
// // // //         const tooltipContent = `
// // // //           <div class="p-2">
// // // //             <div class="font-bold">${d.displayDate}</div>
// // // //             <div>Articles: ${d.count}</div>
// // // //             <div>Emails: ${d.emailCount}</div>
// // // //           </div>
// // // //         `;

// // // //         d3.select("#timeline-tooltip")
// // // //           .style("opacity", 1)
// // // //           .style("left", `${event.pageX + 10}px`)
// // // //           .style("top", `${event.pageY - 28}px`)
// // // //           .html(tooltipContent);
// // // //       })
// // // //       .on("mouseout", function() {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("r", 4)
// // // //           .attr("stroke-width", 2);

// // // //         // Hide tooltip
// // // //         d3.select("#timeline-tooltip").style("opacity", 0);
// // // //       })
// // // //       .transition()
// // // //       .duration(300)
// // // //       .delay((d, i) => 1800 + i * 50)
// // // //       .style("opacity", 1);

// // // //     // Add legend
// // // //     const legend = svg.append("g")
// // // //       .attr("transform", `translate(${width - 120}, 10)`);

// // // //     // Articles legend
// // // //     legend.append("line")
// // // //       .attr("x1", 0)
// // // //       .attr("y1", 0)
// // // //       .attr("x2", 20)
// // // //       .attr("y2", 0)
// // // //       .attr("stroke", PRIMARY_COLOR)
// // // //       .attr("stroke-width", 3);

// // // //     legend.append("text")
// // // //       .attr("x", 25)
// // // //       .attr("y", 4)
// // // //       .text("Articles")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "medium")
// // // //       .style("fill", TEXT_COLOR);

// // // //     // Emails legend
// // // //     legend.append("line")
// // // //       .attr("x1", 0)
// // // //       .attr("y1", 20)
// // // //       .attr("x2", 20)
// // // //       .attr("y2", 20)
// // // //       .attr("stroke", ACCENT_COLOR)
// // // //       .attr("stroke-width", 3)
// // // //       .attr("stroke-dasharray", "5,5");

// // // //     legend.append("text")
// // // //       .attr("x", 25)
// // // //       .attr("y", 24)
// // // //       .text("Emails")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "medium")
// // // //       .style("fill", TEXT_COLOR);

// // // //     // Add tooltip div
// // // //     if (!document.getElementById("timeline-tooltip")) {
// // // //       d3.select("body")
// // // //         .append("div")
// // // //         .attr("id", "timeline-tooltip")
// // // //         .style("position", "absolute")
// // // //         .style("background", "white")
// // // //         .style("padding", "5px")
// // // //         .style("border-radius", "5px")
// // // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // //         .style("pointer-events", "none")
// // // //         .style("opacity", 0)
// // // //         .style("z-index", 10);
// // // //     }
// // // //   };

// // // //   const renderPatientTypeChart = () => {
// // // //     if (!patientTypeChartRef.current || patientTypeData.length === 0) return;

// // // //     // Clear previous chart
// // // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // // //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// // // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // // //     const height = 350 - margin.top - margin.bottom;

// // // //     // Create SVG
// // // //     const svg = d3.select(patientTypeChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width + margin.left + margin.right)
// // // //       .attr("height", height + margin.top + margin.bottom)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // // //     // X scale
// // // //     const x = d3.scaleBand()
// // // //       .domain(patientTypeData.map(d => d.type))
// // // //       .range([0, width])
// // // //       .padding(0.4);

// // // //     // Y scale
// // // //     const y = d3.scaleLinear()
// // // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // // //       .range([height, 0]);

// // // //     // Add grid lines
// // // //     svg.append("g")
// // // //       .attr("class", "grid")
// // // //       .attr("opacity", 0.1)
// // // //       .call(d3.axisLeft(y)
// // // //         .ticks(5)
// // // //         .tickSize(-width)
// // // //         .tickFormat(""))
// // // //       .select(".domain")
// // // //       .remove();

// // // //     // X axis
// // // //     svg.append("g")
// // // //       .attr("transform", `translate(0,${height})`)
// // // //       .call(d3.axisBottom(x)
// // // //         .tickSize(0))
// // // //       .select(".domain")
// // // //       .attr("stroke", BORDER_COLOR);

// // // //     // Style x-axis labels
// // // //     svg.selectAll(".tick text")
// // // //       .style("text-anchor", "end")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "400")
// // // //       .style("fill", TEXT_COLOR)
// // // //       .attr("dy", ".5em")
// // // //       .attr("dx", "-.8em")
// // // //       .attr("transform", "rotate(-25)");

// // // //     // Y axis
// // // //     svg.append("g")
// // // //       .call(d3.axisLeft(y)
// // // //         .ticks(5)
// // // //         .tickFormat(d => d)
// // // //         .tickSize(0))
// // // //       .select(".domain")
// // // //       .attr("stroke", BORDER_COLOR);

// // // //     // Style y-axis text
// // // //     svg.selectAll("g.tick text")
// // // //       .style("font-size", "12px")
// // // //       .style("fill", MUTED_TEXT);

// // // //     // Create gradient definitions
// // // //     const defs = svg.append("defs");

// // // //     // Create gradient for bars
// // // //     const gradient = defs.append("linearGradient")
// // // //       .attr("id", "bar-gradient")
// // // //       .attr("x1", "0%")
// // // //       .attr("y1", "0%")
// // // //       .attr("x2", "0%")
// // // //       .attr("y2", "100%");

// // // //     gradient.append("stop")
// // // //       .attr("offset", "0%")
// // // //       .attr("stop-color", ACCENT_COLOR)
// // // //       .attr("stop-opacity", 1);

// // // //     gradient.append("stop")
// // // //       .attr("offset", "100%")
// // // //       .attr("stop-color", PRIMARY_COLOR)
// // // //       .attr("stop-opacity", 0.8);

// // // //     // Add shadow
// // // //     defs.append("filter")
// // // //       .attr("id", "shadow")
// // // //       .append("feDropShadow")
// // // //       .attr("dx", "0")
// // // //       .attr("dy", "2")
// // // //       .attr("stdDeviation", "2")
// // // //       .attr("flood-opacity", "0.2");

// // // //     // Add bars
// // // //     svg.selectAll(".bar")
// // // //       .data(patientTypeData)
// // // //       .enter()
// // // //       .append("rect")
// // // //       .attr("class", "bar")
// // // //       .attr("x", d => x(d.type))
// // // //       .attr("width", x.bandwidth())
// // // //       .attr("y", height)
// // // //       .attr("height", 0)
// // // //       .attr("rx", 4)
// // // //       .attr("fill", "url(#bar-gradient)")
// // // //       .attr("filter", "url(#shadow)")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("fill", ACCENT_COLOR);

// // // //         // Show tooltip
// // // //         const tooltip = d3.select("body").select(".tooltip");
// // // //         tooltip
// // // //           .style("opacity", 1)
// // // //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// // // //           .style("left", `${event.pageX + 10}px`)
// // // //           .style("top", `${event.pageY - 28}px`);
// // // //       })
// // // //       .on("mouseout", function() {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("fill", "url(#bar-gradient)");

// // // //         // Hide tooltip
// // // //         d3.select("body").select(".tooltip").style("opacity", 0);
// // // //       })
// // // //       .transition()
// // // //       .duration(800)
// // // //       .delay((d, i) => i * 100)
// // // //       .attr("y", d => y(d.count))
// // // //       .attr("height", d => height - y(d.count));

// // // //     // Add value labels
// // // //     svg.selectAll(".value-label")
// // // //       .data(patientTypeData)
// // // //       .enter()
// // // //       .append("text")
// // // //       .attr("class", "value-label")
// // // //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// // // //       .attr("y", d => y(d.count) - 8)
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .style("opacity", 0)
// // // //       .text(d => d.count)
// // // //       .transition()
// // // //       .duration(800)
// // // //       .delay((d, i) => 200 + i * 100)
// // // //       .style("opacity", 1);

// // // //     // Add tooltip
// // // //     if (!d3.select("body").select(".tooltip").node()) {
// // // //       d3.select("body")
// // // //         .append("div")
// // // //         .attr("class", "tooltip")
// // // //         .style("position", "absolute")
// // // //         .style("padding", "8px")
// // // //         .style("background", "white")
// // // //         .style("border-radius", "4px")
// // // //         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// // // //         .style("font-size", "12px")
// // // //         .style("pointer-events", "none")
// // // //         .style("opacity", 0)
// // // //         .style("z-index", 10);
// // // //     }
// // // //   };

// // // //   const renderCasualityChart = () => {
// // // //     if (!casualityChartRef.current || casualityData.length === 0) return;

// // // //     // Clear previous chart
// // // //     d3.select(casualityChartRef.current).selectAll("*").remove();

// // // //     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
// // // //     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// // // //     const height = 350 - margin.top - margin.bottom;
// // // //     const radius = Math.min(width, height) / 2;

// // // //     // Create SVG
// // // //     const svg = d3.select(casualityChartRef.current)
// // // //       .append("svg")
// // // //       .attr("width", width + margin.left + margin.right)
// // // //       .attr("height", height + margin.top + margin.bottom)
// // // //       .append("g")
// // // //       .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

// // // //     // Calculate total for percentages
// // // //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);

// // // //     // Add percentage to each item
// // // //     casualityData.forEach(d => {
// // // //       d.percentage = (d.count / total) * 100;
// // // //     });

// // // //     // Generate colors
// // // //     const color = d3.scaleOrdinal()
// // // //       .domain(casualityData.map(d => d.status))
// // // //       .range(COLOR_PALETTE);

// // // //     // Create pie layout
// // // //     const pie = d3.pie()
// // // //       .value(d => d.count)
// // // //       .sort(null);

// // // //     // Generate arcs
// // // //     const arc = d3.arc()
// // // //       .innerRadius(radius * 0.5)
// // // //       .outerRadius(radius * 0.8);

// // // //     // Larger arc for hover
// // // //     const hoverArc = d3.arc()
// // // //       .innerRadius(radius * 0.5)
// // // //       .outerRadius(radius * 0.85);

// // // //     // Arc for labels
// // // //     const labelArc = d3.arc()
// // // //       .innerRadius(radius * 0.9)
// // // //       .outerRadius(radius * 0.9);

// // // //     // Create pie chart
// // // //     const path = svg.selectAll(".arc")
// // // //       .data(pie(casualityData))
// // // //       .enter()
// // // //       .append("g")
// // // //       .attr("class", "arc");

// // // //     // Add arcs
// // // //     path.append("path")
// // // //       . vrai("d", arc)
// // // //       .attr("fill", d => color(d.data.status))
// // // //       .attr("stroke", "#fff")
// // // //       .attr("stroke-width", 2)
// // // //       .style("opacity", 0.9)
// // // //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // // //       .on("mouseover", function(event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("d", hoverArc)
// // // //           .style("opacity", 1);

// // // //         // Show tooltip
// // // //         const tooltipContent = `
// // // //           <div class="p-2">
// // // //             <div class="font-bold">${d.data.status}</div>
// // // //             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
// // // //           </div>
// // // //         `;

// // // //         d3.select("#casuality-tooltip")
// // // //           .style("opacity", 1)
// // // //           .style("left", `${event.pageX + 10}px`)
// // // //           .style("top", `${event.pageY - 28}px`)
// // // //           .html(tooltipContent);
// // // //       })
// // // //       .on("mouseout", function() {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration(200)
// // // //           .attr("d", arc)
// // // //           .style("opacity", 0.9);

// // // //         // Hide tooltip
// // // //         d3.select("#casuality-tooltip").style("opacity", 0);
// // // //       })
// // // //       .transition()
// // // //       .duration(1000)
// // // //       .attrTween("d", function(d) {
// // // //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // // //         return function(t) {
// // // //           return arc(interpolate(t));
// // // //         };
// // // //       });

// // // //     // Add percentage labels
// // // //     svg.selectAll(".percentage-label")
// // // //       .data(pie(casualityData))
// // // //       .enter()
// // // //       .append("text")
// // // //       .attr("class", "percentage-label")
// // // //       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
// // // //       .attr("dy", "0.35em")
// // // //       .attr("text-anchor", "middle")
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", "#000")
// // // //       .style("pointer-events", "none")
// // // //       .style("opacity", 0)
// // // //       .text(d => `${Math.round(d.data.percentage)}%`)
// // // //       .transition()
// // // //       .delay(1000)
// // // //       .duration(500)
// // // //       .style("opacity", 1);

// // // //     // Add center text
// // // //     svg.append("text")
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("dy", "-0.5em")
// // // //       .style("font-size", "14px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .text("Casuality");

// // // //     svg.append("text")
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("dy", "1em")
// // // //       .style("font-size", "14px")
// // // //       .style("font-weight", "bold")
// // // //       .style("fill", PRIMARY_COLOR)
// // // //       .text("Validation");

// // // //     // Add legend
// // // //     const legend = svg.selectAll(".legend")
// // // //       .data(pie(casualityData))
// // // //       .enter()
// // // //       .append("g")
// // // //       .attr("class", "legend")
// // // //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // // //     legend.append("rect")
// // // //       .attr("width", 15)
// // // //       .attr("height", 15)
// // // //       .attr("rx", 3)
// // // //       .attr("fill", d => color(d.data.status))
// // // //       .style("opacity", 0)
// // // //       .transition()
// // // //       .delay((d, i) => 1000 + i * 100)
// // // //       .duration(500)
// // // //       .style("opacity", 1);

// // // //     legend.append("text")
// // // //       .attr("x", 25)
// // // //       .attr("y", 12)
// // // //       .text(d => d.data.status)
// // // //       .style("font-size", "12px")
// // // //       .style("font-weight", "medium")
// // // //       .style("fill", TEXT_COLOR)
// // // //       .style("opacity", 0)
// // // //       .transition()
// // // //       .delay((d, i) => 1100 + i * 100)
// // // //       .duration(500)
// // // //       .style("opacity", 1);

// // // //     // Add tooltip div
// // // //     if (!document.getElementById("casuality-tooltip")) {
// // // //       d3.select("body")
// // // //         .append("div")
// // // //         .attr("id", "casuality-tooltip")
// // // //         .style("position", "absolute")
// // // //         .style("background", "white")
// // // //         .style("padding", "5px")
// // // //         .style("border-radius", "5px")
// // // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // // //         .style("pointer-events", "none")
// // // //         .style("opacity", 0)
// // // //         .style("z-index", 10);
// // // //     }
// // // //   };

// // // //   // Get current date for display
// // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // //     weekday: 'long',
// // // //     year: 'numeric',
// // // //     month: 'long',
// // // //     day: 'numeric'
// // // //   });

// // // //   // Simple formatter for large numbers
// // // //   const formatNumber = (num) => {
// // // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // // //   };

// // // //   // Handle navigation when clicking on cards
// // // //   const handleCardClick = (route) => {
// // // //     navigate(route);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// // // //       {/* Header */}
// // // //       <div className="fadeIn mb-8">
// // // //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// // // //         <div className="flex items-center mt-2">
// // // //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// // // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // // //         </div>
// // // //       </div>

// // // //       {loading ? (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <div className="relative">
// // // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           {/* Stat Cards */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // // //             <div
// // // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // //               style={{
// // // //                 animationDelay: '100ms',
// // // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // //               }}
// // // //               onClick={() => handleCardClick('/literature-review')}
// // // //             >
// // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // //               <div className="relative z-10 flex items-start">
// // // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // //                   <Mail size={20} className="text-white" />
// // // //                 </div>
// // // //                 <div className="flex-grow">
// // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
// // // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// // // //                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
// // // //                 </div>
// // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // //               </div>
// // // //             </div>

// // // //             <div
// // // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // //               style={{
// // // //                 animationDelay: '200ms',
// // // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // //               }}
// // // //               onClick={() => handleCardClick('/cases')}
// // // //             >
// // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // //               <div className="relative z-10 flex items-start">
// // // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // //                   <FileText size={20} className="text-white" />
// // // //                 </div>
// // // //                 <div className="flex-grow">
// // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
// // // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// // // //                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
// // // //                 </div>
// // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // //               </div>
// // // //             </div>

// // // //             <div
// // // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // // //               style={{
// // // //                 animationDelay: '300ms',
// // // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // // //               }}
// // // //               onClick={() => handleCardClick('/medical-review')}
// // // //             >
// // // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // // //               <div className="relative z-10 flex items-start">
// // // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // // //                   <AlertCircle size={20} className="text-white" />
// // // //                 </div>
// // // //                 <div className="flex-grow">
// // // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// // // //                   <div className="flex items-center space-x-2">
// // // //                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
// // // //                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
// // // //                       Total: {stats.icsrCount + stats.aoiCount}
// // // //                     </span>
// // // //                   </div>
// // // //                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
// // // //                 </div>
// // // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// // // //             {/* Patient Type Chart */}
// // // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
// // // //               <div className="flex items-center justify-between mb-6">
// // // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // //                   <Users size={18} className="mr-2 text-blue-900" />
// // // //                   Patient Type Distribution
// // // //                 </h3>
// // // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="h-80" ref={patientTypeChartRef}></div>
// // // //             </div>

// // // //             {/* Comments Chart */}
// // // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
// // // //               <div className="flex items-center justify-between mb-6">
// // // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // // //                   <MessageSquare size={18} className="mr-2 text-blue-900" />
// // // //                   Comments Distribution
// // // //                 </h3>
// // // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // // //                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="h-72" ref={commentsChartRef}></div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Timeline Chart with Filters */}
// // // //           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
// // // //             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
// // // //               <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4 md:mb-0">
// // // //                 <Calendar size={18} className="mr-2 text-blue-900" />
// // // //                 Monthly Article Processing
// // // //               </h3>

// // // //               <div className="flex flex-wrap gap-2">
// // // //                 {/* Year Filter */}
// // // //                 <select
// // // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // //                   value={selectedYear}
// // // //                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// // // //                 >
// // // //                   {availableYears.map(year => (
// // // //                     <option key={year} value={year}>{year}</option>
// // // //                   ))}
// // // //                 </select>

// // // //                 {/* Start Month Filter */}
// // // //                 <select
// // // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // //                   value={startMonth}
// // // //                   onChange={(e) => setStartMonth(parseInt(e.target.value))}
// // // //                 >
// // // //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // // //                     <option key={month} value={month}>
// // // //                       From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>

// // // //                 {/* End Month Filter */}
// // // //                 <select
// // // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // // //                   value={endMonth}
// // // //                   onChange={(e) => setEndMonth(parseInt(e.target.value))}
// // // //                 >
// // // //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // // //                     <option key={month} value={month}>
// // // //                       To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>

// // // //                 {/* Reset Button */}
// // // //                 <button
// // // //                   className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
// // // //                   onClick={() => {
// // // //                     setSelectedYear(new Date().getFullYear());
// // // //                     setStartMonth(1);
// // // //                     setEndMonth(12);
// // // //                     setSelectedMonth(null);
// // // //                     setEmailFilter(null);
// // // //                   }}
// // // //                 >
// // // //                   Reset Filters
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //             <div className="h-80" ref={timelineChartRef}></div>
// // // //           </div>
// // // //         </>
// // // //       )}

// // // //       {/* Animations */}
// // // //       <style jsx>{`
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; }
// // // //           to { opacity: 1; }
// // // //         }

// // // //         @keyframes slideInUp {
// // // //           from { opacity: 0; transform: translateY(15px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }

// // // //         @keyframes growWidth {
// // // //           from { width: 0; }
// // // //           to { width: 100%; }
// // // //         }

// // // //         .fadeIn {
// // // //           opacity: 0;
// // // //           animation: fadeIn 0.7s ease-out forwards;
// // // //         }

// // // //         .slideInUp {
// // // //           opacity: 0;
// // // //           animation: slideInUp 0.7s ease-out forwards;
// // // //         }

// // // //         .growWidth {
// // // //           width: 0;
// // // //           animation: growWidth 1s ease-out forwards;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;
// // // import { useNavigate } from 'react-router-dom';
// // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // import * as d3 from 'd3';
// // // import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// // // import DatabaseService from '../services/DatabaseService';

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const [stats, setStats] = useState({
// // //     eMailCount: 0,
// // //     articleCount: 0,
// // //     icsrCount: 0,
// // //     aoiCount: 0
// // //   });
// // //   const [startMonth, setStartMonth] = useState(1); // Default to January
// // //   const [endMonth, setEndMonth] = useState(12); // Default to December
// // //   const [patientTypeData, setPatientTypeData] = useState([]);
// // //   const [casualityData, setCasualityData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isChartRendered, setIsChartRendered] = useState(false);
// // //   const [commentsData, setCommentsData] = useState([]);
// // //   const [timelineData, setTimelineData] = useState([]);
// // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // //   const [selectedMonth, setSelectedMonth] = useState(null);
// // //   const [availableYears, setAvailableYears] = useState([]);
// // //   const [emailFilter, setEmailFilter] = useState(null);

// // //   // Refs for chart containers
// // //   const patientTypeChartRef = useRef(null);
// // //   const casualityChartRef = useRef(null);
// // //   const commentsChartRef = useRef(null);
// // //   const timelineChartRef = useRef(null);

// // //   // Primary color and derived palette
// // //   const PRIMARY_COLOR = '#14242c';
// // //   const COLOR_PALETTE = useMemo(() => [
// // //     '#14242c', // Primary dark
// // //     '#386790', // Lighter shade 1
// // //     '#26455e', // Lighter shade 2
// // //     '#2f5677', // Lighter shade 3
// // //     '#386790', // Lighter shade 4
// // //     '#4178a9', // Accent blue
// // //   ], []);

// // //   const ACCENT_COLOR = '#4178a9';
// // //   const LIGHT_BG = '#f8fafc';    // Very light background
// // //   const TEXT_COLOR = '#2c3e50'; // Text color
// // //   const MUTED_TEXT = '#64748b'; // Muted text color
// // //   const BORDER_COLOR = '#e2e8f0'; // Border color

// // //   useEffect(() => {
// // //     fetchDashboardData();

// // //     // Add entrance animation for elements
// // //     const timer = setTimeout(() => {
// // //       setIsChartRendered(true);
// // //     }, 300);

// // //     return () => clearTimeout(timer);
// // //   }, [selectedYear, startMonth, endMonth]);

// // //   // Effect to render charts when data is loaded
// // //   useEffect(() => {
// // //     if (!loading && isChartRendered) {
// // //       renderPatientTypeChart();
// // //       renderCommentsChart();
// // //       renderTimelineChart();
// // //       // Casuality chart rendering (if data is available)
// // //       if (casualityData.length > 0) {
// // //         renderCasualityChart();
// // //       }
// // //     }
// // //   }, [loading, patientTypeData, commentsData, timelineData, casualityData, isChartRendered, selectedYear, startMonth, endMonth, emailFilter]);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       // Fetch literature data
// // //       const data = await DatabaseService.fetchLiteratureReviews();

// // //       // Calculate stats
// // //       const uniqueEMails = new Set();
// // //       let icsrCount = 0;
// // //       let aoiCount = 0;

// // //       // Dynamic tracking objects for Patient Type and Comments
// // //       const patientTypeCounts = {};
// // //       const commentsCounts = {
// // //         "ICSR": 0,
// // //         "AOI": 0,
// // //         "Others": 0
// // //       };

// // //       const timelineDataByMonth = {};
// // //       const emailsByDate = {};
// // //       const allYears = new Set();

// // //       data.forEach(item => {
// // //         // Process Validation Processing Date for filtering
// // //         const dateField = "Validation Processing Date";
// // //         if (item[dateField]) {
// // //           const dateStr = item[dateField].toString();
// // //           if (dateStr) {
// // //             const date = new Date(dateStr);
// // //             if (!isNaN(date.getTime())) {
// // //               const year = date.getFullYear();
// // //               const month = date.getMonth() + 1; // Convert to 1-12
// // //               const yearMonthKey = `${year}-${month - 1}`;

// // //               // Apply year and month range filter
// // //               if (year === selectedYear && month >= startMonth && month <= endMonth) {
// // //                 // Count unique eMails
// // //                 if (item.Mail) {
// // //                   uniqueEMails.add(item.Mail);
// // //                 }

// // //                 // Count articles by month
// // //                 if (!timelineDataByMonth[yearMonthKey]) {
// // //                   timelineDataByMonth[yearMonthKey] = {
// // //                     year,
// // //                     month,
// // //                     count: 0,
// // //                     displayDate: date.toLocaleString('default', { month: 'short', year: 'numeric' })
// // //                   };
// // //                 }
// // //                 timelineDataByMonth[yearMonthKey].count++;

// // //                 // Track emails by date
// // //                 if (!emailsByDate[yearMonthKey]) {
// // //                   emailsByDate[yearMonthKey] = new Set();
// // //                 }
// // //                 if (item.Mail) {
// // //                   emailsByDate[yearMonthKey].add(item.Mail);
// // //                 }

// // //                 // Count ICSR and AOI items
// // //                 const commentsField = "Comments (ICSR, AOI, Not selected)";
// // //                 if (item[commentsField]) {
// // //                   const value = item[commentsField].toString().toUpperCase();
// // //                   if (value.includes('ICSR')) {
// // //                     icsrCount++;
// // //                     commentsCounts["ICSR"]++;
// // //                   } else if (value.includes('AOI')) {
// // //                     aoiCount++;
// // //                     commentsCounts["AOI"]++;
// // //                   } else {
// // //                     commentsCounts["Others"]++;
// // //                   }
// // //                 } else {
// // //                   commentsCounts["Others"]++;
// // //                 }

// // //                 // Dynamically track patient type distribution
// // //                 const patientTypeField = Object.keys(item).find(key =>
// // //                   key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// // //                 );

// // //                 if (patientTypeField && item[patientTypeField]) {
// // //                   const value = item[patientTypeField].toString().trim();
// // //                   if (!patientTypeCounts[value]) {
// // //                     patientTypeCounts[value] = 0;
// // //                   }
// // //                   patientTypeCounts[value]++;
// // //                 }
// // //               }
// // //               allYears.add(year);
// // //             }
// // //           }
// // //         }
// // //       });

// // //       // Add email counts to timeline data
// // //       Object.keys(timelineDataByMonth).forEach(key => {
// // //         timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
// // //       });

// // //       // Convert timeline data to array and sort by date
// // //       const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
// // //         if (a.year !== b.year) return a.year - b.year;
// // //         return a.month - b.month;
// // //       });

// // //       // Update stats
// // //       setStats({
// // //         eMailCount: uniqueEMails.size,
// // //         articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
// // //         icsrCount: icsrCount,
// // //         aoiCount: aoiCount
// // //       });

// // //       // Convert patient type distribution to array for chart
// // //       const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// // //         type,
// // //         count
// // //       }));
// // //       setPatientTypeData(patientTypeArray);

// // //       // Convert comments data to array for chart
// // //       const commentsArray = Object.entries(commentsCounts).map(([status, count]) => ({
// // //         status,
// // //         count
// // //       }));
// // //       setCommentsData(commentsArray);

// // //       // Set timeline data and available years
// // //       setTimelineData(timelineArray);
// // //       setAvailableYears(Array.from(allYears).sort());

// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error("Error fetching dashboard data:", err);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const renderCommentsChart = () => {
// // //     if (!commentsChartRef.current) return;

// // //     // Clear previous chart
// // //     d3.select(commentsChartRef.current).selectAll("*").remove();

// // //     // Check if data is empty
// // //     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
// // //       d3.select(commentsChartRef.current)
// // //         .append("div")
// // //         .attr("class", "flex justify-center items-center h-full")
// // //         .append("p")
// // //         .attr("class", "text-gray-500")
// // //         .text("No data available for the selected filters");
// // //       return;
// // //     }

// // //     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// // //     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
// // //     const height = 370 - margin.top - margin.bottom;
// // //     const radius = Math.min(width, height) / 2;

// // //     // Create SVG
// // //     const svg = d3.select(commentsChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width + margin.left + margin.right)
// // //       .attr("height", height + margin.top + margin.bottom)
// // //       .append("g")
// // //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// // //     // Calculate total for percentages
// // //     const total = commentsData.reduce((sum, d) => sum + d.count, 0);

// // //     // Add percentage to each item
// // //     commentsData.forEach(d => {
// // //       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
// // //     });

// // //     // Generate colors for Comments chart
// // //     const commentsColors = {
// // //       "ICSR": "#14242c",
// // //       "AOI": "#4178a9",
// // //       "Others": "#26455e"
// // //     };

// // //     // Create pie layout
// // //     const pie = d3.pie()
// // //       .value(d => d.count)
// // //       .sort(null)
// // //       .padAngle(0.03);

// // //     // Generate the arcs
// // //     const arc = d3.arc()
// // //       .innerRadius(radius * 0.5)
// // //       .outerRadius(radius * 0.8)
// // //       .cornerRadius(4);

// // //     // Larger arc for hover effect
// // //     const hoverArc = d3.arc()
// // //       .innerRadius(radius * 0.5)
// // //       .outerRadius(radius * 0.85)
// // //       .cornerRadius(4);

// // //     // Arc for labels
// // //     const labelArc = d3.arc()
// // //       .innerRadius(radius * 0.9)
// // //       .outerRadius(radius * 0.9);

// // //     // Create the pie chart
// // //     const path = svg.selectAll(".arc")
// // //       .data(pie(commentsData))
// // //       .enter()
// // //       .append("g")
// // //       .attr("class", "arc");

// // //     // Add the arcs
// // //     path.append("path")
// // //       .attr("d", arc)
// // //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // //       .attr("stroke", "#fff")
// // //       .attr("stroke-width", 2)
// // //       .style("opacity", 0.9)
// // //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // //       .on("mouseover", function (event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("d", hoverArc)
// // //           .style("opacity", 1);

// // //         // Show tooltip
// // //         const tooltipContent = `
// // //           <div class="p-2">
// // //             <div class="font-bold">${d.data.status}</div>
// // //             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
// // //           </div>
// // //         `;

// // //         d3.select("#comments-tooltip")
// // //           .style("opacity", 1)
// // //           .style("left", `${event.pageX + 10}px`)
// // //           .style("top", `${event.pageY - 28}px`)
// // //           .html(tooltipContent);
// // //       })
// // //       .on("mouseout", function () {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("d", arc)
// // //           .style("opacity", 0.9);

// // //         // Hide tooltip
// // //         d3.select("#comments-tooltip").style("opacity", 0);
// // //       })
// // //       .transition()
// // //       .duration(1000)
// // //       .attrTween("d", function (d) {
// // //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // //         return function (t) {
// // //           return arc(interpolate(t));
// // //         };
// // //       });

// // //     // Add count labels
// // //     const arcLabels = svg.selectAll(".arc-label")
// // //       .data(pie(commentsData))
// // //       .enter()
// // //       .append("text")
// // //       .attr("class", "arc-label")
// // //       .attr("transform", d => {
// // //         const centroid = arc.centroid(d);
// // //         const x = centroid[0] * 1.0;
// // //         const y = centroid[1] * 1.0;
// // //         return `translate(${x}, ${y})`;
// // //       })
// // //       .attr("dy", "0.35em")
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "11px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", "#fff")
// // //       .style("pointer-events", "none")
// // //       .style("opacity", 0)
// // //       .text(d => d.data.count)
// // //       .transition()
// // //       .delay(1000)
// // //       .duration(500)
// // //       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

// // //     // Add callout lines for small segments
// // //     commentsData.forEach((d, i) => {
// // //       if (d.status === "ICSR" && d.percentage < 3) {
// // //         const pieData = pie(commentsData)[i];
// // //         const centroid = arc.centroid(pieData);
// // //         const x = centroid[0] * 1.5;
// // //         const y = centroid[1] * 1.5;

// // //         svg.append("line")
// // //           .attr("x1", centroid[0])
// // //           .attr("y1", centroid[1])
// // //           .attr("x2", x)
// // //           .attr("y2", y)
// // //           .attr("stroke", "#14242c")
// // //           .attr("stroke-width", 1.5)
// // //           .attr("opacity", 0)
// // //           .transition()
// // //           .delay(1000)
// // //           .duration(500)
// // //           .attr("opacity", 1);

// // //         svg.append("text")
// // //           .attr("x", x + 10)
// // //           .attr("y", y)
// // //           .attr("text-anchor", "start")
// // //           .attr("alignment-baseline", "middle")
// // //           .style("font-size", "12px")
// // //           .style("font-weight", "bold")
// // //           .style("fill", "#14242c")
// // //           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
// // //           .attr("opacity", 0)
// // //           .transition()
// // //           .delay(1100)
// // //           .duration(500)
// // //           .attr("opacity", 1);
// // //       }
// // //     });

// // //     // Add center text
// // //     svg.append("text")
// // //       .attr("text-anchor", "middle")
// // //       .attr("dy", "-0.5em")
// // //       .style("font-size", "14px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .text("Comments");

// // //     svg.append("text")
// // //       .attr("text-anchor", "middle")
// // //       .attr("dy", "1em")
// // //       .style("font-size", "14px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .text("Distribution");

// // //     // Add legend
// // //     const legend = svg.selectAll(".legend")
// // //       .data(pie(commentsData))
// // //       .enter()
// // //       .append("g")
// // //       .attr("class", "legend")
// // //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // //     legend.append("rect")
// // //       .attr("width", 15)
// // //       .attr("height", 15)
// // //       .attr("rx", 3)
// // //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// // //       .style("opacity", 0)
// // //       .transition()
// // //       .delay((d, i) => 1000 + i * 100)
// // //       .duration(500)
// // //       .style("opacity", 1);

// // //     legend.append("text")
// // //       .attr("x", 25)
// // //       .attr("y", 12)
// // //       .text(d => `${d.data.status}: ${d.data.count}`)
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "medium")
// // //       .style("fill", TEXT_COLOR)
// // //       .style("opacity", 0)
// // //       .transition()
// // //       .delay((d, i) => 1100 + i * 100)
// // //       .duration(500)
// // //       .style("opacity", 1);

// // //     // Add tooltip div
// // //     if (!document.getElementById("comments-tooltip")) {
// // //       d3.select("body")
// // //         .append("div")
// // //         .attr("id", "comments-tooltip")
// // //         .style("position", "absolute")
// // //         .style("background", "white")
// // //         .style("padding", "5px")
// // //         .style("border-radius", "5px")
// // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // //         .style("pointer-events", "none")
// // //         .style("opacity", 0)
// // //         .style("z-index", 10);
// // //     }
// // //   };

// // //   const renderTimelineChart = () => {
// // //     if (!timelineChartRef.current || timelineData.length === 0) return;

// // //     // Filter the data by year
// // //     const filteredData = timelineData.filter(d => d.year === selectedYear);

// // //     // Filter by month range
// // //     const monthRangeFilteredData = filteredData.filter(d => {
// // //       return d.month >= startMonth && d.month <= endMonth;
// // //     });

// // //     // Further filter by email count if selected
// // //     const finalFilteredData = emailFilter !== null
// // //       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
// // //       : monthRangeFilteredData;

// // //     // If no data after filtering, show a message
// // //     if (finalFilteredData.length === 0) {
// // //       d3.select(timelineChartRef.current).selectAll("*").remove();
// // //       d3.select(timelineChartRef.current)
// // //         .append("div")
// // //         .attr("class", "flex justify-center items-center h-full")
// // //         .append("p")
// // //         .attr("class", "text-gray-500")
// // //         .text("No data available for the selected filters");
// // //       return;
// // //     }

// // //     // Sort data by date
// // //     finalFilteredData.sort((a, b) => {
// // //       if (a.year !== b.year) return a.year - b.year;
// // //       return a.month - b.month;
// // //     });

// // //     // Clear previous chart
// // //     d3.select(timelineChartRef.current).selectAll("*").remove();

// // //     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
// // //     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
// // //     const height = 350 - margin.top - margin.bottom;

// // //     // Create SVG
// // //     const svg = d3.select(timelineChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width + margin.left + margin.right)
// // //       .attr("height", height + margin.top + margin.bottom)
// // //       .append("g")
// // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // //     // X scale
// // //     const x = d3.scalePoint()
// // //       .domain(finalFilteredData.map(d => d.displayDate))
// // //       .range([0, width])
// // //       .padding(0.5);

// // //     // Y scale for article count
// // //     const yArticles = d3.scaleLinear()
// // //       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
// // //       .range([height, 0]);

// // //     // Y scale for email count
// // //     const yEmails = d3.scaleLinear()
// // //       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
// // //       .range([height, 0]);

// // //     // Add grid lines
// // //     svg.append("g")
// // //       .attr("class", "grid")
// // //       .attr("opacity", 0.1)
// // //       .call(d3.axisLeft(yArticles)
// // //         .ticks(5)
// // //         .tickSize(-width)
// // //         .tickFormat(""))
// // //       .select(".domain")
// // //       .remove();

// // //     // X axis
// // //     svg.append("g")
// // //       .attr("transform", `translate(0,${height})`)
// // //       .call(d3.axisBottom(x)
// // //         .tickSize(0))
// // //       .select(".domain")
// // //       .attr("stroke", BORDER_COLOR);

// // //     // Style x-axis labels
// // //     svg.selectAll(".tick text")
// // //       .style("text-anchor", "end")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "400")
// // //       .style("fill", TEXT_COLOR)
// // //       .attr("dy", "0.5em")
// // //       .attr("dx", "-0.8em")
// // //       .attr("transform", "rotate(-45)");

// // //     // Left Y axis for articles
// // //     svg.append("g")
// // //       .call(d3.axisLeft(yArticles)
// // //         .ticks(5)
// // //         .tickFormat(d => d)
// // //         .tickSize(0))
// // //       .select(".domain")
// // //       .attr("stroke", BORDER_COLOR);

// // //     // Add left Y axis label
// // //     svg.append("text")
// // //       .attr("transform", "rotate(-90)")
// // //       .attr("y", -margin.left + 15)
// // //       .attr("x", -height / 2)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .text("Articles");

// // //     // Right Y axis for emails
// // //     svg.append("g")
// // //       .attr("transform", `translate(${width}, 0)`)
// // //       .call(d3.axisRight(yEmails)
// // //         .ticks(5)
// // //         .tickFormat(d => d)
// // //         .tickSize(0))
// // //       .select(".domain")
// // //       .attr("stroke", BORDER_COLOR);

// // //     // Add right Y axis label
// // //     svg.append("text")
// // //       .attr("transform", "rotate(-90)")
// // //       .attr("y", width + margin.right - 15)
// // //       .attr("x", -height / 2)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", ACCENT_COLOR)
// // //       .text("Emails");

// // //     // Style y-axis text
// // //     svg.selectAll("g.tick text")
// // //       .style("font-size", "12px")
// // //       .style("fill", MUTED_TEXT);

// // //     // Define line generators
// // //     const articleLine = d3.line()
// // //       .x(d => x(d.displayDate))
// // //       .y(d => yArticles(d.count))
// // //       .curve(d3.curveMonotoneX);

// // //     const emailLine = d3.line()
// // //       .x(d => x(d.displayDate))
// // //       .y(d => yEmails(d.emailCount))
// // //       .curve(d3.curveMonotoneX);

// // //     // Create gradient definitions
// // //     const defs = svg.append("defs");

// // //     // Create gradient for article line
// // //     const articleGradient = defs.append("linearGradient")
// // //       .attr("id", "article-line-gradient")
// // //       .attr("gradientUnits", "userSpaceOnUse")
// // //       .attr("x1", 0)
// // //       .attr("y1", 0)
// // //       .attr("x2", 0)
// // //       .attr("y2", height);

// // //     articleGradient.append("stop")
// // //       .attr("offset", "0%")
// // //       .attr("stop-color", PRIMARY_COLOR);

// // //     articleGradient.append("stop")
// // //       .attr("offset", "100%")
// // //       .attr("stop-color", PRIMARY_COLOR)
// // //       .attr("stop-opacity", 0.8);

// // //     // Create gradient for email line
// // //     const emailGradient = defs.append("linearGradient")
// // //       .attr("id", "email-line-gradient")
// // //       .attr("gradientUnits", "userSpaceOnUse")
// // //       .attr("x1", 0)
// // //       .attr("y1", 0)
// // //       .attr("x2", 0)
// // //       .attr("y2", height);

// // //     emailGradient.append("stop")
// // //       .attr("offset", "0%")
// // //       .attr("stop-color", ACCENT_COLOR);

// // //     emailGradient.append("stop")
// // //       .attr("offset", "100%")
// // //       .attr("stop-color", ACCENT_COLOR)
// // //       .attr("stop-opacity", 0.8);

// // //     // Add article line path
// // //     const articlePath = svg.append("path")
// // //       .datum(finalFilteredData)
// // //       .attr("fill", "none")
// // //       .attr("stroke", "url(#article-line-gradient)")
// // //       .attr("stroke-width", 3)
// // //       .attr("stroke-linejoin", "round")
// // //       .attr("stroke-linecap", "round")
// // //       .attr("d", articleLine)
// // //       .style("opacity", 0.8)
// // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

// // //     // Animate the line drawing
// // //     const articlePathLength = articlePath.node().getTotalLength();
// // //     articlePath
// // //       .attr("stroke-dasharray", articlePathLength)
// // //       .attr("stroke-dashoffset", articlePathLength)
// // //       .transition()
// // //       .duration(1500)
// // //       .attr("stroke-dashoffset", 0);

// // //     // Add email line path
// // //     const emailPath = svg.append("path")
// // //       .datum(finalFilteredData)
// // //       .attr("fill", "none")
// // //       .attr("stroke", "url(#email-line-gradient)")
// // //       .attr("stroke-width", 3)
// // //       .attr("stroke-linejoin", "round")
// // //       .attr("stroke-linecap", "round")
// // //       .attr("stroke-dasharray", "5,5")
// // //       .attr("d", emailLine)
// // //       .style("opacity", 0.8);

// // //     // Animate the line drawing
// // //     const emailPathLength = emailPath.node().getTotalLength();
// // //     emailPath
// // //       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
// // //       .attr("stroke-dashoffset", emailPathLength)
// // //       .transition()
// // //       .duration(1500)
// // //       .delay(300)
// // //       .attr("stroke-dasharray", "5,5")
// // //       .attr("stroke-dashoffset", 0);

// // //     // Add circles for article data points
// // //     svg.selectAll(".article-point")
// // //       .data(finalFilteredData)
// // //       .enter()
// // //       .append("circle")
// // //       .attr("class", "article-point")
// // //       .attr("cx", d => x(d.displayDate))
// // //       .attr("cy", d => yArticles(d.count))
// // //       .attr("r", 5)
// // //       .attr("fill", "#fff")
// // //       .attr("stroke", PRIMARY_COLOR)
// // //       .attr("stroke-width", 2)
// // //       .style("opacity", 0)
// // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // //       .on("mouseover", function (event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("r", 7)
// // //           .attr("stroke-width", 3);

// // //         // Show tooltip
// // //         const tooltipContent = `
// // //           <div class="p-2">
// // //             <div class="font-bold">${d.displayDate}</div>
// // //             <div>Articles: ${d.count}</div>
// // //             <div>Emails: ${d.emailCount}</div>
// // //           </div>
// // //         `;

// // //         d3.select("#timeline-tooltip")
// // //           .style("opacity", 1)
// // //           .style("left", `${event.pageX + 10}px`)
// // //           .style("top", `${event.pageY - 28}px`)
// // //           .html(tooltipContent);
// // //       })
// // //       .on("mouseout", function () {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("r", 5)
// // //           .attr("stroke-width", 2);

// // //         // Hide tooltip
// // //         d3.select("#timeline-tooltip").style("opacity", 0);
// // //       })
// // //       .transition()
// // //       .duration(300)
// // //       .delay((d, i) => 1500 + i * 50)
// // //       .style("opacity", 1);

// // //     // Add circles for email data points
// // //     svg.selectAll(".email-point")
// // //       .data(finalFilteredData)
// // //       .enter()
// // //       .append("circle")
// // //       .attr("class", "email-point")
// // //       .attr("cx", d => x(d.displayDate))
// // //       .attr("cy", d => yEmails(d.emailCount))
// // //       .attr("r", 4)
// // //       .attr("fill", "#fff")
// // //       .attr("stroke", ACCENT_COLOR)
// // //       .attr("stroke-width", 2)
// // //       .style("opacity", 0)
// // //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// // //       .on("mouseover", function (event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("r", 6)
// // //           .attr("stroke-width", 3);

// // //         // Show tooltip
// // //         const tooltipContent = `
// // //           <div class="p-2">
// // //             <div class="font-bold">${d.displayDate}</div>
// // //             <div>Articles: ${d.count}</div>
// // //             <div>Emails: ${d.emailCount}</div>
// // //           </div>
// // //         `;

// // //         d3.select("#timeline-tooltip")
// // //           .style("opacity", 1)
// // //           .style("left", `${event.pageX + 10}px`)
// // //           .style("top", `${event.pageY - 28}px`)
// // //           .html(tooltipContent);
// // //       })
// // //       .on("mouseout", function () {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("r", 4)
// // //           .attr("stroke-width", 2);

// // //         // Hide tooltip
// // //         d3.select("#timeline-tooltip").style("opacity", 0);
// // //       })
// // //       .transition()
// // //       .duration(300)
// // //       .delay((d, i) => 1800 + i * 50)
// // //       .style("opacity", 1);

// // //     // Add legend
// // //     const legend = svg.append("g")
// // //       .attr("transform", `translate(${width - 120}, 10)`);

// // //     // Articles legend
// // //     legend.append("line")
// // //       .attr("x1", 0)
// // //       .attr("y1", 0)
// // //       .attr("x2", 20)
// // //       .attr("y2", 0)
// // //       .attr("stroke", PRIMARY_COLOR)
// // //       .attr("stroke-width", 3);

// // //     legend.append("text")
// // //       .attr("x", 25)
// // //       .attr("y", 4)
// // //       .text("Articles")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "medium")
// // //       .style("fill", TEXT_COLOR);

// // //     // Emails legend
// // //     legend.append("line")
// // //       .attr("x1", 0)
// // //       .attr("y1", 20)
// // //       .attr("x2", 20)
// // //       .attr("y2", 20)
// // //       .attr("stroke", ACCENT_COLOR)
// // //       .attr("stroke-width", 3)
// // //       .attr("stroke-dasharray", "5,5");

// // //     legend.append("text")
// // //       .attr("x", 25)
// // //       .attr("y", 24)
// // //       .text("Emails")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "medium")
// // //       .style("fill", TEXT_COLOR);

// // //     // Add tooltip div
// // //     if (!document.getElementById("timeline-tooltip")) {
// // //       d3.select("body")
// // //         .append("div")
// // //         .attr("id", "timeline-tooltip")
// // //         .style("position", "absolute")
// // //         .style("background", "white")
// // //         .style("padding", "5px")
// // //         .style("border-radius", "5px")
// // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // //         .style("pointer-events", "none")
// // //         .style("opacity", 0)
// // //         .style("z-index", 10);
// // //     }
// // //   };

// // //   const renderPatientTypeChart = () => {
// // //     if (!patientTypeChartRef.current) return;

// // //     // Clear previous chart
// // //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// // //     // Check if data is empty
// // //     if (patientTypeData.length === 0) {
// // //       d3.select(patientTypeChartRef.current)
// // //         .append("div")
// // //         .attr("class", "flex justify-center items-center h-full")
// // //         .append("p")
// // //         .attr("class", "text-gray-500")
// // //         .text("No data available for the selected filters");
// // //       return;
// // //     }

// // //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// // //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// // //     const height = 350 - margin.top - margin.bottom;

// // //     // Create SVG
// // //     const svg = d3.select(patientTypeChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width + margin.left + margin.right)
// // //       .attr("height", height + margin.top + margin.bottom)
// // //       .append("g")
// // //       .attr("transform", `translate(${margin.left},${margin.top})`);

// // //     // X scale
// // //     const x = d3.scaleBand()
// // //       .domain(patientTypeData.map(d => d.type))
// // //       .range([0, width])
// // //       .padding(0.4);

// // //     // Y scale
// // //     const y = d3.scaleLinear()
// // //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// // //       .range([height, 0]);

// // //     // Add grid lines
// // //     svg.append("g")
// // //       .attr("class", "grid")
// // //       .attr("opacity", 0.1)
// // //       .call(d3.axisLeft(y)
// // //         .ticks(5)
// // //         .tickSize(-width)
// // //         .tickFormat(""))
// // //       .select(".domain")
// // //       .remove();

// // //     // X axis
// // //     svg.append("g")
// // //       .attr("transform", `translate(0,${height})`)
// // //       .call(d3.axisBottom(x)
// // //         .tickSize(0))
// // //       .select(".domain")
// // //       .attr("stroke", BORDER_COLOR);

// // //     // Style x-axis labels
// // //     svg.selectAll(".tick text")
// // //       .style("text-anchor", "end")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "400")
// // //       .style("fill", TEXT_COLOR)
// // //       .attr("dy", ".5em")
// // //       .attr("dx", "-.8em")
// // //       .attr("transform", "rotate(-25)");

// // //     // Y axis
// // //     svg.append("g")
// // //       .call(d3.axisLeft(y)
// // //         .ticks(5)
// // //         .tickFormat(d => d)
// // //         .tickSize(0))
// // //       .select(".domain")
// // //       .attr("stroke", BORDER_COLOR);

// // //     // Style y-axis text
// // //     svg.selectAll("g.tick text")
// // //       .style("font-size", "12px")
// // //       .style("fill", MUTED_TEXT);

// // //     // Create gradient definitions
// // //     const defs = svg.append("defs");

// // //     // Create gradient for bars
// // //     const gradient = defs.append("linearGradient")
// // //       .attr("id", "bar-gradient")
// // //       .attr("x1", "0%")
// // //       .attr("y1", "0%")
// // //       .attr("x2", "0%")
// // //       .attr("y2", "100%");

// // //     gradient.append("stop")
// // //       .attr("offset", "0%")
// // //       .attr("stop-color", ACCENT_COLOR)
// // //       .attr("stop-opacity", 1);

// // //     gradient.append("stop")
// // //       .attr("offset", "100%")
// // //       .attr("stop-color", PRIMARY_COLOR)
// // //       .attr("stop-opacity", 0.8);

// // //     // Add shadow
// // //     defs.append("filter")
// // //       .attr("id", "shadow")
// // //       .append("feDropShadow")
// // //       .attr("dx", "0")
// // //       .attr("dy", "2")
// // //       .attr("stdDeviation", "2")
// // //       .attr("flood-opacity", "0.2");

// // //     // Add bars
// // //     svg.selectAll(".bar")
// // //       .data(patientTypeData)
// // //       .enter()
// // //       .append("rect")
// // //       .attr("class", "bar")
// // //       .attr("x", d => x(d.type))
// // //       .attr("width", x.bandwidth())
// // //       .attr("y", height)
// // //       .attr("height", 0)
// // //       .attr("rx", 4)
// // //       .attr("fill", "url(#bar-gradient)")
// // //       .attr("filter", "url(#shadow)")
// // //       .on("mouseover", function (event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("fill", ACCENT_COLOR);

// // //         // Show tooltip
// // //         const tooltip = d3.select("body").select(".tooltip");
// // //         tooltip
// // //           .style("opacity", 1)
// // //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// // //           .style("left", `${event.pageX + 10}px`)
// // //           .style("top", `${event.pageY - 28}px`);
// // //       })
// // //       .on("mouseout", function () {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("fill", "url(#bar-gradient)");

// // //         // Hide tooltip
// // //         d3.select("body").select(".tooltip").style("opacity", 0);
// // //       })
// // //       .transition()
// // //       .duration(800)
// // //       .delay((d, i) => i * 100)
// // //       .attr("y", d => y(d.count))
// // //       .attr("height", d => height - y(d.count));

// // //     // Add value labels
// // //     svg.selectAll(".value-label")
// // //       .data(patientTypeData)
// // //       .enter()
// // //       .append("text")
// // //       .attr("class", "value-label")
// // //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// // //       .attr("y", d => y(d.count) - 8)
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .style("opacity", 0)
// // //       .text(d => d.count)
// // //       .transition()
// // //       .duration(800)
// // //       .delay((d, i) => 200 + i * 100)
// // //       .style("opacity", 1);

// // //     // Add tooltip
// // //     if (!d3.select("body").select(".tooltip").node()) {
// // //       d3.select("body")
// // //         .append("div")
// // //         .attr("class", "tooltip")
// // //         .style("position", "absolute")
// // //         .style("padding", "8px")
// // //         .style("background", "white")
// // //         .style("border-radius", "4px")
// // //         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// // //         .style("font-size", "12px")
// // //         .style("pointer-events", "none")
// // //         .style("opacity", 0)
// // //         .style("z-index", 10);
// // //     }
// // //   };

// // //   const renderCasualityChart = () => {
// // //     if (!casualityChartRef.current || casualityData.length === 0) return;

// // //     // Clear previous chart
// // //     d3.select(casualityChartRef.current).selectAll("*").remove();

// // //     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
// // //     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// // //     const height = 350 - margin.top - margin.bottom;
// // //     const radius = Math.min(width, height) / 2;

// // //     // Create SVG
// // //     const svg = d3.select(casualityChartRef.current)
// // //       .append("svg")
// // //       .attr("width", width + margin.left + margin.right)
// // //       .attr("height", height + margin.top + margin.bottom)
// // //       .append("g")
// // //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// // //     // Calculate total for percentages
// // //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);

// // //     // Add percentage to each item
// // //     casualityData.forEach(d => {
// // //       d.percentage = (d.count / total) * 100;
// // //     });

// // //     // Generate colors
// // //     const color = d3.scaleOrdinal()
// // //       .domain(casualityData.map(d => d.status))
// // //       .range(COLOR_PALETTE);

// // //     // Create pie layout
// // //     const pie = d3.pie()
// // //       .value(d => d.count)
// // //       .sort(null);

// // //     // Generate arcs
// // //     const arc = d3.arc()
// // //       .innerRadius(radius * 0.5)
// // //       .outerRadius(radius * 0.8);

// // //     // Larger arc for hover
// // //     const hoverArc = d3.arc()
// // //       .innerRadius(radius * 0.5)
// // //       .outerRadius(radius * 0.85);

// // //     // Arc for labels
// // //     const labelArc = d3.arc()
// // //       .innerRadius(radius * 0.9)
// // //       .outerRadius(radius * 0.9);

// // //     // Create pie chart
// // //     const path = svg.selectAll(".arc")
// // //       .data(pie(casualityData))
// // //       .enter()
// // //       .append("g")
// // //       .attr("class", "arc");

// // //     // Add arcs
// // //     path.append("path")
// // //       .attr("d", arc)
// // //       .attr("fill", d => color(d.data.status))
// // //       .attr("stroke", "#fff")
// // //       .attr("stroke-width", 2)
// // //       .style("opacity", 0.9)
// // //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// // //       .on("mouseover", function (event, d) {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("d", hoverArc)
// // //           .style("opacity", 1);

// // //         // Show tooltip
// // //         const tooltipContent = `
// // //           <div class="p-2">
// // //             <div class="font-bold">${d.data.status}</div>
// // //             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
// // //           </div>
// // //         `;

// // //         d3.select("#casuality-tooltip")
// // //           .style("opacity", 1)
// // //           .style("left", `${event.pageX + 10}px`)
// // //           .style("top", `${event.pageY - 28}px`)
// // //           .html(tooltipContent);
// // //       })
// // //       .on("mouseout", function () {
// // //         d3.select(this)
// // //           .transition()
// // //           .duration(200)
// // //           .attr("d", arc)
// // //           .style("opacity", 0.9);

// // //         // Hide tooltip
// // //         d3.select("#casuality-tooltip").style("opacity", 0);
// // //       })
// // //       .transition()
// // //       .duration(1000)
// // //       .attrTween("d", function (d) {
// // //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// // //         return function (t) {
// // //           return arc(interpolate(t));
// // //         };
// // //       });

// // //     // Add percentage labels
// // //     svg.selectAll(".percentage-label")
// // //       .data(pie(casualityData))
// // //       .enter()
// // //       .append("text")
// // //       .attr("class", "percentage-label")
// // //       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
// // //       .attr("dy", "0.35em")
// // //       .attr("text-anchor", "middle")
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", "#000")
// // //       .style("pointer-events", "none")
// // //       .style("opacity", 0)
// // //       .text(d => `${Math.round(d.data.percentage)}%`)
// // //       .transition()
// // //       .delay(1000)
// // //       .duration(500)
// // //       .style("opacity", 1);

// // //     // Add center text
// // //     svg.append("text")
// // //       .attr("text-anchor", "middle")
// // //       .attr("dy", "-0.5em")
// // //       .style("font-size", "14px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .text("Casuality");

// // //     svg.append("text")
// // //       .attr("text-anchor", "middle")
// // //       .attr("dy", "1em")
// // //       .style("font-size", "14px")
// // //       .style("font-weight", "bold")
// // //       .style("fill", PRIMARY_COLOR)
// // //       .text("Validation");

// // //     // Add legend
// // //     const legend = svg.selectAll(".legend")
// // //       .data(pie(casualityData))
// // //       .enter()
// // //       .append("g")
// // //       .attr("class", "legend")
// // //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// // //     legend.append("rect")
// // //       .attr("width", 15)
// // //       .attr("height", 15)
// // //       .attr("rx", 3)
// // //       .attr("fill", d => color(d.data.status))
// // //       .style("opacity", 0)
// // //       .transition()
// // //       .delay((d, i) => 1000 + i * 100)
// // //       .duration(500)
// // //       .style("opacity", 1);

// // //     legend.append("text")
// // //       .attr("x", 25)
// // //       .attr("y", 12)
// // //       .text(d => d.data.status)
// // //       .style("font-size", "12px")
// // //       .style("font-weight", "medium")
// // //       .style("fill", TEXT_COLOR)
// // //       .style("opacity", 0)
// // //       .transition()
// // //       .delay((d, i) => 1100 + i * 100)
// // //       .duration(500)
// // //       .style("opacity", 1);

// // //     // Add tooltip div
// // //     if (!document.getElementById("casuality-tooltip")) {
// // //       d3.select("body")
// // //         .append("div")
// // //         .attr("id", "casuality-tooltip")
// // //         .style("position", "absolute")
// // //         .style("background", "white")
// // //         .style("padding", "5px")
// // //         .style("border-radius", "5px")
// // //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// // //         .style("pointer-events", "none")
// // //         .style("opacity", 0)
// // //         .style("z-index", 10);
// // //     }
// // //   };

// // //   // Get current date for display
// // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // //     weekday: 'long',
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric'
// // //   });

// // //   // Simple formatter for large numbers
// // //   const formatNumber = (num) => {
// // //     return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
// // //   };

// // //   // Handle navigation when clicking on cards
// // //   const handleCardClick = (route) => {
// // //     navigate(route);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// // //       {/* Header */}
// // //       <div className="fadeIn mb-8">
// // //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// // //         <div className="flex items-center mt-2">
// // //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// // //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="relative">
// // //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// // //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {/* Stat Cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // //             <div
// // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // //               style={{
// // //                 animationDelay: '100ms',
// // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // //               }}
// // //               onClick={() => handleCardClick('/literature-review')}
// // //             >
// // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // //               <div className="relative z-10 flex items-start">
// // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // //                   <Mail size={20} className="text-white" />
// // //                 </div>
// // //                 <div className="flex-grow">
// // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
// // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// // //                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
// // //                 </div>
// // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // //               </div>
// // //             </div>

// // //             <div
// // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // //               style={{
// // //                 animationDelay: '200ms',
// // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // //               }}
// // //               onClick={() => handleCardClick('/cases')}
// // //             >
// // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // //               <div className="relative z-10 flex items-start">
// // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // //                   <FileText size={20} className="text-white" />
// // //                 </div>
// // //                 <div className="flex-grow">
// // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
// // //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// // //                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
// // //                 </div>
// // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // //               </div>
// // //             </div>

// // //             <div
// // //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// // //               style={{
// // //                 animationDelay: '300ms',
// // //                 background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))`,
// // //               }}
// // //               onClick={() => handleCardClick('/medical-review')}
// // //             >
// // //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// // //               <div className="relative z-10 flex items-start">
// // //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// // //                   <AlertCircle size={20} className="text-white" />
// // //                 </div>
// // //                 <div className="flex-grow">
// // //                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// // //                   <div className="flex items-center space-x-2">
// // //                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
// // //                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
// // //                       Total: {stats.icsrCount + stats.aoiCount}
// // //                     </span>
// // //                   </div>
// // //                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
// // //                 </div>
// // //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// // //             {/* Patient Type Chart */}
// // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
// // //               <div className="flex items-center justify-between mb-6">
// // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // //                   <Users size={18} className="mr-2 text-blue-900" />
// // //                   Patient Type Distribution
// // //                 </h3>
// // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// // //                 </div>
// // //               </div>
// // //               <div className="h-80" ref={patientTypeChartRef}></div>
// // //             </div>

// // //             {/* Comments Chart */}
// // //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
// // //               <div className="flex items-center justify-between mb-6">
// // //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// // //                   <MessageSquare size={18} className="mr-2 text-blue-900" />
// // //                   Comments Distribution
// // //                 </h3>
// // //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// // //                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
// // //                 </div>
// // //               </div>
// // //               <div className="h-72" ref={commentsChartRef}></div>
// // //             </div>
// // //           </div>

// // //           {/* Timeline Chart with Filters */}
// // //           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
// // //             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
// // //               <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4 md:mb-0">
// // //                 <Calendar size={18} className="mr-2 text-blue-900" />
// // //                 Monthly Article Processing
// // //               </h3>

// // //               <div className="flex flex-wrap gap-2">
// // //                 {/* Year Filter */}
// // //                 <select
// // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // //                   value={selectedYear}
// // //                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// // //                 >
// // //                   {availableYears.map(year => (
// // //                     <option key={year} value={year}>{year}</option>
// // //                   ))}
// // //                 </select>

// // //                 {/* Start Month Filter */}
// // //                 <select
// // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // //                   value={startMonth}
// // //                   onChange={(e) => setStartMonth(parseInt(e.target.value))}
// // //                 >
// // //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // //                     <option key={month} value={month}>
// // //                       From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// // //                     </option>
// // //                   ))}
// // //                 </select>

// // //                 {/* End Month Filter */}
// // //                 <select
// // //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// // //                   value={endMonth}
// // //                   onChange={(e) => setEndMonth(parseInt(e.target.value))}
// // //                 >
// // //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// // //                     <option key={month} value={month}>
// // //                       To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// // //                     </option>
// // //                   ))}
// // //                 </select>

// // //                 {/* Reset Button */}
// // //                 <button
// // //                   className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
// // //                   onClick={() => {
// // //                     setSelectedYear(new Date().getFullYear());
// // //                     setStartMonth(1);
// // //                     setEndMonth(12);
// // //                     setSelectedMonth(null);
// // //                     setEmailFilter(null);
// // //                   }}
// // //                 >
// // //                   Reset Filters
// // //                 </button>
// // //               </div>
// // //             </div>
// // //             <div className="h-80" ref={timelineChartRef}></div>
// // //           </div>
// // //         </>
// // //       )}

// // //       {/* Animations */}
// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; }
// // //           to { opacity: 1; }
// // //         }

// // //         @keyframes slideInUp {
// // //           from { opacity: 0; transform: translateY(15px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }

// // //         @keyframes growWidth {
// // //           from { width: 0; }
// // //           to { width: 100%; }
// // //         }

// // //         .fadeIn {
// // //           opacity: 0;
// // //           animation: fadeIn 0.7s ease-out forwards;
// // //         }

// // //         .slideInUp {
// // //           opacity: 0;
// // //           animation: slideInUp 0.7s ease-out forwards;
// // //         }

// // //         .growWidth {
// // //           width: 0;
// // //           animation: growWidth 1s ease-out forwards;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import { useNavigate } from 'react-router-dom';
// // import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// // import * as d3 from 'd3';
// // import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// // import DatabaseService from '../services/DatabaseService';
// // import debounce from 'lodash/debounce';

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [stats, setStats] = useState({
// //     eMailCount: 0,
// //     articleCount: 0,
// //     icsrCount: 0,
// //     aoiCount: 0
// //   });
// //   const [startMonth, setStartMonth] = useState(1); // Default to January
// //   const [endMonth, setEndMonth] = useState(12); // Default to December
// //   const [patientTypeData, setPatientTypeData] = useState([]);
// //   const [casualityData, setCasualityData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isChartRendered, setIsChartRendered] = useState(false);
// //   const [commentsData, setCommentsData] = useState([]);
// //   const [timelineData, setTimelineData] = useState([]);
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //   const [selectedMonth, setSelectedMonth] = useState(null);
// //   const [availableYears, setAvailableYears] = useState([]);
// //   const [emailFilter, setEmailFilter] = useState(null);

// //   // Refs for chart containers
// //   const patientTypeChartRef = useRef(null);
// //   const casualityChartRef = useRef(null);
// //   const commentsChartRef = useRef(null);
// //   const timelineChartRef = useRef(null);

// //   // Primary color and derived palette
// //   const PRIMARY_COLOR = '#14242c';
// //   const COLOR_PALETTE = useMemo(() => [
// //     '#14242c', // Primary dark
// //     '#386790', // Lighter shade 1
// //     '#26455e', // Lighter shade 2
// //     '#2f5677', // Lighter shade 3
// //     '#386790', // Lighter shade 4
// //     '#4178a9', // Accent blue
// //   ], []);

// //   const ACCENT_COLOR = '#4178a9';
// //   const LIGHT_BG = '#f8fafc';    // Very light background
// //   const TEXT_COLOR = '#2c3e50'; // Text color
// //   const MUTED_TEXT = '#64748b'; // Muted text color
// //   const BORDER_COLOR = '#e2e8f0'; // Border color

// //   // Debounced fetch function to prevent rapid filter changes
// //   const debouncedFetchDashboardData = useMemo(
// //     () => debounce(async (year, start, end) => {
// //       try {
// //         setLoading(true);
// //         const data = await DatabaseService.fetchLiteratureReviews();

// //         const uniqueEMails = new Set();
// //         let icsrCount = 0;
// //         let aoiCount = 0;
// //         const patientTypeCounts = {};
// //         const commentsCounts = { "ICSR": 0, "AOI": 0, "Others": 0 };
// //         const timelineDataByMonth = {};
// //         const emailsByDate = {};
// //         const allYears = new Set();

// //         data.forEach(item => {
// //           const dateField = "Validation Processing Date";
// //           if (item[dateField]) {
// //             const dateStr = item[dateField].toString();
// //             if (dateStr) {
// //               const date = new Date(dateStr);
// //               if (!isNaN(date.getTime())) {
// //                 const itemYear = date.getFullYear();
// //                 const month = date.getMonth() + 1;
// //                 const yearMonthKey = `${itemYear}-${month - 1}`;

// //                 if (itemYear === year && month >= start && month <= end) {
// //                   if (item.Mail) {
// //                     uniqueEMails.add(item.Mail);
// //                   }

// //                   if (!timelineDataByMonth[yearMonthKey]) {
// //                     timelineDataByMonth[yearMonthKey] = {
// //                       year: itemYear,
// //                       month,
// //                       count: 0,
// //                       displayDate: date.toLocaleString('default', { month: 'short', year: 'numeric' })
// //                     };
// //                   }
// //                   timelineDataByMonth[yearMonthKey].count++;

// //                   if (!emailsByDate[yearMonthKey]) {
// //                     emailsByDate[yearMonthKey] = new Set();
// //                   }
// //                   if (item.Mail) {
// //                     emailsByDate[yearMonthKey].add(item.Mail);
// //                   }

// //                   const commentsField = "Comments (ICSR, AOI, Not selected)";
// //                   if (item[commentsField]) {
// //                     const value = item[commentsField].toString().toUpperCase();
// //                     if (value.includes('ICSR')) {
// //                       icsrCount++;
// //                       commentsCounts["ICSR"]++;
// //                     } else if (value.includes('AOI')) {
// //                       aoiCount++;
// //                       commentsCounts["AOI"]++;
// //                     } else {
// //                       commentsCounts["Others"]++;
// //                     }
// //                   } else {
// //                     commentsCounts["Others"]++;
// //                   }

// //                   const patientTypeField = Object.keys(item).find(key =>
// //                     key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// //                   );

// //                   if (patientTypeField && item[patientTypeField]) {
// //                     const value = item[patientTypeField].toString().trim();
// //                     if (!patientTypeCounts[value]) {
// //                       patientTypeCounts[value] = 0;
// //                     }
// //                     patientTypeCounts[value]++;
// //                   }
// //                 }
// //                 allYears.add(itemYear);
// //               }
// //             }
// //           }
// //         });

// //         Object.keys(timelineDataByMonth).forEach(key => {
// //           timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
// //         });

// //         const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
// //           if (a.year !== b.year) return a.year - b.year;
// //           return a.month - b.month;
// //         });

// //         setStats({
// //           eMailCount: uniqueEMails.size,
// //           articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
// //           icsrCount,
// //           aoiCount
// //         });

// //         const patientTypeArray = Object.entries(patientTypeCounts).map(([type, count]) => ({
// //           type,
// //           count
// //         }));
// //         setPatientTypeData(patientTypeArray);

// //         const commentsArray = Object.entries(commentsCounts).map(([status, count]) => ({
// //           status,
// //           count
// //         }));
// //         setCommentsData(commentsArray);

// //         setTimelineData(timelineArray);
// //         setAvailableYears(Array.from(allYears).sort());
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching dashboard data:", err);
// //         setLoading(false);
// //       }
// //     }, 300),
// //     []
// //   );

// //   useEffect(() => {
// //     debouncedFetchDashboardData(selectedYear, startMonth, endMonth);
// //     const timer = setTimeout(() => {
// //       setIsChartRendered(true);
// //     }, 100);
// //     return () => clearTimeout(timer);
// //   }, [selectedYear, startMonth, endMonth, debouncedFetchDashboardData]);

// //   useEffect(() => {
// //     if (!loading && isChartRendered) {
// //       renderPatientTypeChart();
// //       renderCommentsChart();
// //       renderTimelineChart();
// //       if (casualityData.length > 0) {
// //         renderCasualityChart();
// //       }
// //     }
// //   }, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData]);

// //   const renderCommentsChart = useCallback(() => {
// //     if (!commentsChartRef.current) return;

// //     d3.select(commentsChartRef.current).selectAll("*").remove();

// //     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
// //       d3.select(commentsChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// //     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 370 - margin.top - margin.bottom;
// //     const radius = Math.min(width, height) / 2;

// //     const svg = d3.select(commentsChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// //     const total = commentsData.reduce((sum, d) => sum + d.count, 0);
// //     commentsData.forEach(d => {
// //       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
// //     });

// //     const commentsColors = {
// //       "ICSR": "#14242c",
// //       "AOI": "#4178a9",
// //       "Others": "#26455e"
// //     };

// //     const pie = d3.pie()
// //       .value(d => d.count)
// //       .sort(null)
// //       .padAngle(0.03);

// //     const arc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.8)
// //       .cornerRadius(4);

// //     const hoverArc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.85)
// //       .cornerRadius(4);

// //     const labelArc = d3.arc()
// //       .innerRadius(radius * 0.9)
// //       .outerRadius(radius * 0.9);

// //     const path = svg.selectAll(".arc")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "arc");

// //     path.append("path")
// //       .attr("d", arc)
// //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// //       .attr("stroke", "#fff")
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0.9)
// //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", hoverArc)
// //           .style("opacity", 1);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.data.status}</div>
// //             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
// //           </div>
// //         `;

// //         d3.select("#comments-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", arc)
// //           .style("opacity", 0.9);

// //         d3.select("#comments-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(1000)
// //       .attrTween("d", function(d) {
// //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// //         return function(t) {
// //           return arc(interpolate(t));
// //         };
// //       });

// //     const arcLabels = svg.selectAll(".arc-label")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("text")
// //       .attr("class", "arc-label")
// //       .attr("transform", d => {
// //         const centroid = arc.centroid(d);
// //         const x = centroid[0] * 1.0;
// //         const y = centroid[1] * 1.0;
// //         return `translate(${x}, ${y})`;
// //       })
// //       .attr("dy", "0.35em")
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "11px")
// //       .style("font-weight", "bold")
// //       .style("fill", "#fff")
// //       .style("pointer-events", "none")
// //       .style("opacity", 0)
// //       .text(d => d.data.count)
// //       .transition()
// //       .delay(1000)
// //       .duration(500)
// //       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

// //     commentsData.forEach((d, i) => {
// //       if (d.status === "ICSR" && d.percentage < 3) {
// //         const pieData = pie(commentsData)[i];
// //         const centroid = arc.centroid(pieData);
// //         const x = centroid[0] * 1.5;
// //         const y = centroid[1] * 1.5;

// //         svg.append("line")
// //           .attr("x1", centroid[0])
// //           .attr("y1", centroid[1])
// //           .attr("x2", x)
// //           .attr("y2", y)
// //           .attr("stroke", "#14242c")
// //           .attr("stroke-width", 1.5)
// //           .attr("opacity", 0)
// //           .transition()
// //           .delay(1000)
// //           .duration(500)
// //           .attr("opacity", 1);

// //         svg.append("text")
// //           .attr("x", x + 10)
// //           .attr("y", y)
// //           .attr("text-anchor", "start")
// //           .attr("alignment-baseline", "middle")
// //           .style("font-size", "12px")
// //           .style("font-weight", "bold")
// //           .style("fill", "#14242c")
// //           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
// //           .attr("opacity", 0)
// //           .transition()
// //           .delay(1100)
// //           .duration(500)
// //           .attr("opacity", 1);
// //       }
// //     });

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.5em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Comments");

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Distribution");

// //     const legend = svg.selectAll(".legend")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "legend")
// //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// //     legend.append("rect")
// //       .attr("width", 15)
// //       .attr("height", 15)
// //       .attr("rx", 3)
// //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1000 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 12)
// //       .text(d => `${d.data.status}: ${d.data.count}`)
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR)
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1100 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     if (!document.getElementById("comments-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "comments-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [commentsData]);

// //   const renderTimelineChart = useCallback(() => {
// //     if (!timelineChartRef.current) return;

// //     const filteredData = timelineData.filter(d => d.year === selectedYear);
// //     const monthRangeFilteredData = filteredData.filter(d => d.month >= startMonth && d.month <= endMonth);
// //     const finalFilteredData = emailFilter !== null
// //       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
// //       : monthRangeFilteredData;

// //     if (finalFilteredData.length === 0) {
// //       d3.select(timelineChartRef.current).selectAll("*").remove();
// //       d3.select(timelineChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     finalFilteredData.sort((a, b) => {
// //       if (a.year !== b.year) return a.year - b.year;
// //       return a.month - b.month;
// //     });

// //     d3.select(timelineChartRef.current).selectAll("*").remove();

// //     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
// //     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;

// //     const svg = d3.select(timelineChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     const x = d3.scalePoint()
// //       .domain(finalFilteredData.map(d => d.displayDate))
// //       .range([0, width])
// //       .padding(0.5);

// //     const yArticles = d3.scaleLinear()
// //       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
// //       .range([height, 0]);

// //     const yEmails = d3.scaleLinear()
// //       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
// //       .range([height, 0]);

// //     svg.append("g")
// //       .attr("class", "grid")
// //       .attr("opacity", 0.1)
// //       .call(d3.axisLeft(yArticles)
// //         .ticks(5)
// //         .tickSize(-width)
// //         .tickFormat(""))
// //       .select(".domain")
// //       .remove();

// //     svg.append("g")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll(".tick text")
// //       .style("text-anchor", "end")
// //       .style("font-size", "12px")
// //       .style("font-weight", "400")
// //       .style("fill", TEXT_COLOR)
// //       .attr("dy", "0.5em")
// //       .attr("dx", "-0.8em")
// //       .attr("transform", "rotate(-45)");

// //     svg.append("g")
// //       .call(d3.axisLeft(yArticles)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.append("text")
// //       .attr("transform", "rotate(-90)")
// //       .attr("y", -margin.left + 15)
// //       .attr("x", -height / 2)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Articles");

// //     svg.append("g")
// //       .attr("transform", `translate(${width}, 0)`)
// //       .call(d3.axisRight(yEmails)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.append("text")
// //       .attr("transform", "rotate(-90)")
// //       .attr("y", width + margin.right - 15)
// //       .attr("x", -height / 2)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", ACCENT_COLOR)
// //       .text("Emails");

// //     svg.selectAll("g.tick text")
// //       .style("font-size", "12px")
// //       .style("fill", MUTED_TEXT);

// //     const articleLine = d3.line()
// //       .x(d => x(d.displayDate))
// //       .y(d => yArticles(d.count))
// //       .curve(d3.curveMonotoneX);

// //     const emailLine = d3.line()
// //       .x(d => x(d.displayDate))
// //       .y(d => yEmails(d.emailCount))
// //       .curve(d3.curveMonotoneX);

// //     const defs = svg.append("defs");

// //     const articleGradient = defs.append("linearGradient")
// //       .attr("id", "article-line-gradient")
// //       .attr("gradientUnits", "userSpaceOnUse")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 0)
// //       .attr("y2", height);

// //     articleGradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", PRIMARY_COLOR);

// //     articleGradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", PRIMARY_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     const emailGradient = defs.append("linearGradient")
// //       .attr("id", "email-line-gradient")
// //       .attr("gradientUnits", "userSpaceOnUse")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 0)
// //       .attr("y2", height);

// //     emailGradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", ACCENT_COLOR);

// //     emailGradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", ACCENT_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     const articlePath = svg.append("path")
// //       .datum(finalFilteredData)
// //       .attr("fill", "none")
// //       .attr("stroke", "url(#article-line-gradient)")
// //       .attr("stroke-width", 3)
// //       .attr("stroke-linejoin", "round")
// //       .attr("stroke-linecap", "round")
// //       .attr("d", articleLine)
// //       .style("opacity", 0.8)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

// //     const articlePathLength = articlePath.node().getTotalLength();
// //     articlePath
// //       .attr("stroke-dasharray", articlePathLength)
// //       .attr("stroke-dashoffset", articlePathLength)
// //       .transition()
// //       .duration(1500)
// //       .attr("stroke-dashoffset", 0);

// //     const emailPath = svg.append("path")
// //       .datum(finalFilteredData)
// //       .attr("fill", "none")
// //       .attr("stroke", "url(#email-line-gradient)")
// //       .attr("stroke-width", 3)
// //       .attr("stroke-linejoin", "round")
// //       .attr("stroke-linecap", "round")
// //       .attr("stroke-dasharray", "5,5")
// //       .attr("d", emailLine)
// //       .style("opacity", 0.8);

// //     const emailPathLength = emailPath.node().getTotalLength();
// //     emailPath
// //       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
// //       .attr("stroke-dashoffset", emailPathLength)
// //       .transition()
// //       .duration(1500)
// //       .delay(300)
// //       .attr("stroke-dasharray", "5,5")
// //       .attr("stroke-dashoffset", 0);

// //     svg.selectAll(".article-point")
// //       .data(finalFilteredData)
// //       .enter()
// //       .append("circle")
// //       .attr("class", "article-point")
// //       .attr("cx", d => x(d.displayDate))
// //       .attr("cy", d => yArticles(d.count))
// //       .attr("r", 5)
// //       .attr("fill", "#fff")
// //       .attr("stroke", PRIMARY_COLOR)
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 7)
// //           .attr("stroke-width", 3);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.displayDate}</div>
// //             <div>Articles: ${d.count}</div>
// //             <div>Emails: ${d.emailCount}</div>
// //           </div>
// //         `;

// //         d3.select("#timeline-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 5)
// //           .attr("stroke-width", 2);

// //         d3.select("#timeline-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(300)
// //       .delay((d, i) => 1500 + i * 50)
// //       .style("opacity", 1);

// //     svg.selectAll(".email-point")
// //       .data(finalFilteredData)
// //       .enter()
// //       .append("circle")
// //       .attr("class", "email-point")
// //       .attr("cx", d => x(d.displayDate))
// //       .attr("cy", d => yEmails(d.emailCount))
// //       .attr("r", 4)
// //       .attr("fill", "#fff")
// //       .attr("stroke", ACCENT_COLOR)
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 6)
// //           .attr("stroke-width", 3);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.displayDate}</div>
// //             <div>Articles: ${d.count}</div>
// //             <div>Emails: ${d.emailCount}</div>
// //           </div>
// //         `;

// //         d3.select("#timeline-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 4)
// //           .attr("stroke-width", 2);

// //         d3.select("#timeline-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(300)
// //       .delay((d, i) => 1800 + i * 50)
// //       .style("opacity", 1);

// //     const legend = svg.append("g")
// //       .attr("transform", `translate(${width - 120}, 10)`);

// //     legend.append("line")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 20)
// //       .attr("y2", 0)
// //       .attr("stroke", PRIMARY_COLOR)
// //       .attr("stroke-width", 3);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 4)
// //       .text("Articles")
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR);

// //     legend.append("line")
// //       .attr("x1", 0)
// //       .attr("y1", 20)
// //       .attr("x2", 20)
// //       .attr("y2", 20)
// //       .attr("stroke", ACCENT_COLOR)
// //       .attr("stroke-width", 3)
// //       .attr("stroke-dasharray", "5,5");

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 24)
// //       .text("Emails")
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR);

// //     if (!document.getElementById("timeline-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "timeline-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [timelineData, selectedYear, startMonth, endMonth, emailFilter]);

// //   const renderPatientTypeChart = useCallback(() => {
// //     if (!patientTypeChartRef.current) return;

// //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// //     if (patientTypeData.length === 0) {
// //       d3.select(patientTypeChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;

// //     const svg = d3.select(patientTypeChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     const x = d3.scaleBand()
// //       .domain(patientTypeData.map(d => d.type))
// //       .range([0, width])
// //       .padding(0.4);

// //     const y = d3.scaleLinear()
// //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// //       .range([height, 0]);

// //     svg.append("g")
// //       .attr("class", "grid")
// //       .attr("opacity", 0.1)
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickSize(-width)
// //         .tickFormat(""))
// //       .select(".domain")
// //       .remove();

// //     svg.append("g")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll(".tick text")
// //       .style("text-anchor", "end")
// //       .style("font-size", "12px")
// //       .style("font-weight", "400")
// //       .style("fill", TEXT_COLOR)
// //       .attr("dy", ".5em")
// //       .attr("dx", "-.8em")
// //       .attr("transform", "rotate(-25)");

// //     svg.append("g")
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll("g.tick text")
// //       .style("font-size", "12px")
// //       .style("fill", MUTED_TEXT);

// //     const defs = svg.append("defs");

// //     const gradient = defs.append("linearGradient")
// //       .attr("id", "bar-gradient")
// //       .attr("x1", "0%")
// //       .attr("y1", "0%")
// //       .attr("x2", "0%")
// //       .attr("y2", "100%");

// //     gradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", ACCENT_COLOR)
// //       .attr("stop-opacity", 1);

// //     gradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", PRIMARY_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     defs.append("filter")
// //       .attr("id", "shadow")
// //       .append("feDropShadow")
// //       .attr("dx", "0")
// //       .attr("dy", "2")
// //       .attr("stdDeviation", "2")
// //       .attr("flood-opacity", "0.2");

// //     svg.selectAll(".bar")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("rect")
// //       .attr("class", "bar")
// //       .attr("x", d => x(d.type))
// //       .attr("width", x.bandwidth())
// //       .attr("y", height)
// //       .attr("height", 0)
// //       .attr("rx", 4)
// //       .attr("fill", "url(#bar-gradient)")
// //       .attr("filter", "url(#shadow)")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", ACCENT_COLOR);

// //         const tooltip = d3.select("body").select(".tooltip");
// //         tooltip
// //           .style("opacity", 1)
// //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", "url(#bar-gradient)");

// //         d3.select("body").select(".tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => i * 100)
// //       .attr("y", d => y(d.count))
// //       .attr("height", d => height - y(d.count));

// //     svg.selectAll(".value-label")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("text")
// //       .attr("class", "value-label")
// //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// //       .attr("y", d => y(d.count) - 8)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .style("opacity", 0)
// //       .text(d => d.count)
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => 200 + i * 100)
// //       .style("opacity", 1);

// //     if (!d3.select("body").select(".tooltip").node()) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("class", "tooltip")
// //         .style("position", "absolute")
// //         .style("padding", "8px")
// //         .style("background", "white")
// //         .style("border-radius", "4px")
// //         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// //         .style("font-size", "12px")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [patientTypeData]);

// //   const renderCasualityChart = useCallback(() => {
// //     if (!casualityChartRef.current || casualityData.length === 0) return;

// //     d3.select(casualityChartRef.current).selectAll("*").remove();

// //     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
// //     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;
// //     const radius = Math.min(width, height) / 2;

// //     const svg = d3.select(casualityChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
// //     casualityData.forEach(d => {
// //       d.percentage = (d.count / total) * 100;
// //     });

// //     const color = d3.scaleOrdinal()
// //       .domain(casualityData.map(d => d.status))
// //       .range(COLOR_PALETTE);

// //     const pie = d3.pie()
// //       .value(d => d.count)
// //       .sort(null);

// //     const arc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.8);

// //     const hoverArc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.85);

// //     const labelArc = d3.arc()
// //       .innerRadius(radius * 0.9)
// //       .outerRadius(radius * 0.9);

// //     const path = svg.selectAll(".arc")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "arc");

// //     path.append("path")
// //       .attr("d", arc)
// //       .attr("fill", d => color(d.data.status))
// //       .attr("stroke", "#fff")
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0.9)
// //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", hoverArc)
// //           .style("opacity", 1);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.data.status}</div>
// //             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
// //           </div>
// //         `;

// //         d3.select("#casuality-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", arc)
// //           .style("opacity", 0.9);

// //         d3.select("#casuality-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(1000)
// //       .attrTween("d", function(d) {
// //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// //         return function(t) {
// //           return arc(interpolate(t));
// //         };
// //       });

// //     svg.selectAll(".percentage-label")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("text")
// //       .attr("class", "percentage-label")
// //       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
// //       .attr("dy", "0.35em")
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", "#000")
// //       .style("pointer-events", "none")
// //       .style("opacity", 0)
// //       .text(d => `${Math.round(d.data.percentage)}%`)
// //       .transition()
// //       .delay(1000)
// //       .duration(500)
// //       .style("opacity", 1);

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.5em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Casuality");

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Validation");

// //     const legend = svg.selectAll(".legend")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "legend")
// //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// //     legend.append("rect")
// //       .attr("width", 15)
// //       .attr("height", 15)
// //       .attr("rx", 3)
// //       .attr("fill", d => color(d.data.status))
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1000 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 12)
// //       .text(d => d.data.status)
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR)
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1100 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     if (!document.getElementById("casuality-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "casuality-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [casualityData]);

// //   const currentDate = new Date().toLocaleDateString('en-US', {
// //     weekday: 'long',
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

// //   const handleCardClick = route => navigate(route);

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// //       <div className="fadeIn mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// //         <div className="flex items-center mt-2">
// //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="relative">
// //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '100ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/literature-review')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <Mail size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
// //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// //                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>

// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '200ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/cases')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <FileText size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
// //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// //                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>

// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '300ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/medical-review')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <AlertCircle size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// //                   <div className="flex items-center space-x-2">
// //                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
// //                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
// //                       Total: {stats.icsrCount + stats.icsrCount}
// //                     </span>
// //                   </div>
// //                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <Users size={18} className="mr-2 text-blue-900" />
// //                   Patient Type Distribution
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// //                 </div>
// //               </div>
// //               <div className="h-80" ref={patientTypeChartRef}></div>
// //             </div>

// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <MessageSquare size={18} className="mr-2 text-blue-900" />
// //                   Comments Distribution
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
// //                 </div>
// //               </div>
// //               <div className="h-72" ref={commentsChartRef}></div>
// //             </div>
// //           </div>

// //           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
// //             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
// //               <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4 md:mb-0">
// //                 <Calendar size={18} className="mr-2 text-blue-900" />
// //                 Monthly Article Processing
// //               </h3>

// //               <div className="flex flex-wrap gap-2">
// //                 <select
// //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //                   value={selectedYear}
// //                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// //                 >
// //                   {availableYears.map(year => (
// //                     <option key={year} value={year}>{year}</option>
// //                   ))}
// //                 </select>

// //                 <select
// //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //                   value={startMonth}
// //                   onChange={(e) => setStartMonth(parseInt(e.target.value))}
// //                 >
// //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// //                     <option key={month} value={month}>
// //                       From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// //                     </option>
// //                   ))}
// //                 </select>

// //                 <select
// //                   className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //                   value={endMonth}
// //                   onChange={(e) => setEndMonth(parseInt(e.target.value))}
// //                 >
// //                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// //                     <option key={month} value={month}>
// //                       To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// //                     </option>
// //                   ))}
// //                 </select>

// //                 <button
// //                   className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
// //                   onClick={() => {
// //                     setSelectedYear(new Date().getFullYear());
// //                     setStartMonth(1);
// //                     setEndMonth(12);
// //                     setSelectedMonth(null);
// //                     setEmailFilter(null);
// //                   }}
// //                 >
// //                   Reset Filters
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="h-80" ref={timelineChartRef}></div>
// //           </div>
// //         </>
// //       )}

// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }

// //         @keyframes slideInUp {
// //           from { opacity: 0; transform: translateY(15px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }

// //         @keyframes growWidth {
// //           from { width: 0; }
// //           to { width: 100%; }
// //         }

// //         .fadeIn {
// //           opacity: 0;
// //           animation: fadeIn 0.7s ease-out forwards;
// //         }

// //         .slideInUp {
// //           opacity: 0;
// //           animation: slideInUp 0.7s ease-out forwards;
// //         }
          

// //         .growWidth {
// //           width: 0;
// //           animation: growWidth 1s ease-out forwards;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Home;
// // import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import * as d3 from 'd3';
// // import { debounce } from 'lodash';
// // import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// // import DatabaseService from '../services/DatabaseService';

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [stats, setStats] = useState({
// //     eMailCount: 0,
// //     articleCount: 0,
// //     icsrCount: 0,
// //     aoiCount: 0
// //   });
// //   const [startMonth, setStartMonth] = useState(1); // Default to January
// //   const [endMonth, setEndMonth] = useState(12); // Default to December
// //   const [patientTypeData, setPatientTypeData] = useState([]);
// //   const [casualityData, setCasualityData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isChartRendered, setIsChartRendered] = useState(false);
// //   const [commentsData, setCommentsData] = useState([]);
// //   const [timelineData, setTimelineData] = useState([]);
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //   const [selectedMonth, setSelectedMonth] = useState(null);
// //   const [availableYears, setAvailableYears] = useState([]);
// //   const [emailFilter, setEmailFilter] = useState(null);

// //   // Refs for chart containers
// //   const patientTypeChartRef = useRef(null);
// //   const casualityChartRef = useRef(null);
// //   const commentsChartRef = useRef(null);
// //   const timelineChartRef = useRef(null);

// //   // Primary color and derived palette
// //   const PRIMARY_COLOR = '#14242c';
// //   const COLOR_PALETTE = useMemo(() => [
// //     '#14242c', // Primary dark
// //     '#386790', // Lighter shade 1
// //     '#26455e', // Lighter shade 2
// //     '#2f5677', // Lighter shade 3
// //     '#386790', // Lighter shade 4
// //     '#4178a9', // Accent blue
// //   ], []);

// //   const ACCENT_COLOR = '#4178a9';
// //   const LIGHT_BG = '#f8fafc';    // Very light background
// //   const TEXT_COLOR = '#2c3e50'; // Text color
// //   const MUTED_TEXT = '#64748b'; // Muted text color
// //   const BORDER_COLOR = '#e2e8f0'; // Border color

// //   // Cache for processed data to avoid redundant computations
// //   const dataCache = useRef({});

// //   // Optimized data processing function
// //   const processDashboardData = useCallback(async (year, start, end) => {
// //     const cacheKey = `${year}-${start}-${end}`;
    
// //     // Check cache first
// //     if (dataCache.current[cacheKey]) {
// //       const { stats, patientTypeData, commentsData, timelineData, availableYears } = dataCache.current[cacheKey];
// //       setStats(stats);
// //       setPatientTypeData(patientTypeData);
// //       setCommentsData(commentsData);
// //       setTimelineData(timelineData);
// //       setAvailableYears(availableYears);
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const data = await DatabaseService.fetchLiteratureReviews();

// //       const uniqueEMails = new Set();
// //       let icsrCount = 0;
// //       let aoiCount = 0;
// //       const patientTypeCounts = {};
// //       const commentsCounts = { "ICSR": 0, "AOI": 0, "Others": 0 };
// //       const timelineDataByMonth = {};
// //       const emailsByDate = {};
// //       const allYears = new Set();

// //       data.forEach(item => {
// //         const dateField = "Validation Processing Date";
// //         if (item[dateField]) {
// //           const dateStr = item[dateField].toString();
// //           if (dateStr) {
// //             const date = new Date(dateStr);
// //             if (!isNaN(date.getTime())) {
// //               const itemYear = date.getFullYear();
// //               const month = date.getMonth() + 1;
// //               const yearMonthKey = `${itemYear}-${month - 1}`;

// //               if (itemYear === year && month >= start && month <= end) {
// //                 if (item.Mail) {
// //                   uniqueEMails.add(item.Mail);
// //                 }

// //                 if (!timelineDataByMonth[yearMonthKey]) {
// //                   timelineDataByMonth[yearMonthKey] = {
// //                     year: itemYear,
// //                     month,
// //                     count: 0,
// //                     displayDate: date.toLocaleString('default', { month: 'short', year: 'numeric' })
// //                   };
// //                 }
// //                 timelineDataByMonth[yearMonthKey].count++;

// //                 if (!emailsByDate[yearMonthKey]) {
// //                   emailsByDate[yearMonthKey] = new Set();
// //                 }
// //                 if (item.Mail) {
// //                   emailsByDate[yearMonthKey].add(item.Mail);
// //                 }

// //                 const commentsField = "Comments (ICSR, AOI, Not selected)";
// //                 if (item[commentsField]) {
// //                   const value = item[commentsField].toString().toUpperCase();
// //                   if (value.includes('ICSR')) {
// //                     icsrCount++;
// //                     commentsCounts["ICSR"]++;
// //                   } else if (value.includes('AOI')) {
// //                     aoiCount++;
// //                     commentsCounts["AOI"]++;
// //                   } else {
// //                     commentsCounts["Others"]++;
// //                   }
// //                 } else {
// //                   commentsCounts["Others"]++;
// //                 }

// //                 const patientTypeField = Object.keys(item).find(key =>
// //                   key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
// //                 );

// //                 if (patientTypeField && item[patientTypeField]) {
// //                   const value = item[patientTypeField].toString().trim();
// //                   if (!patientTypeCounts[value]) {
// //                     patientTypeCounts[value] = 0;
// //                   }
// //                   patientTypeCounts[value]++;
// //                 }
// //               }
// //               allYears.add(itemYear);
// //             }
// //           }
// //         }
// //       });

// //       Object.keys(timelineDataByMonth).forEach(key => {
// //         timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
// //       });

// //       const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
// //         if (a.year !== b.year) return a.year - b.year;
// //         return a.month - b.month;
// //       });

// //       const processedData = {
// //         stats: {
// //           eMailCount: uniqueEMails.size,
// //           articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
// //           icsrCount,
// //           aoiCount
// //         },
// //         patientTypeData: Object.entries(patientTypeCounts).map(([type, count]) => ({
// //           type,
// //           count
// //         })),
// //         commentsData: Object.entries(commentsCounts).map(([status, count]) => ({
// //           status,
// //           count
// //         })),
// //         timelineData: timelineArray,
// //         availableYears: Array.from(allYears).sort()
// //       };

// //       // Cache the processed data
// //       dataCache.current[cacheKey] = processedData;

// //       setStats(processedData.stats);
// //       setPatientTypeData(processedData.patientTypeData);
// //       setCommentsData(processedData.commentsData);
// //       setTimelineData(processedData.timelineData);
// //       setAvailableYears(processedData.availableYears);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching dashboard data:", err);
// //       setLoading(false);
// //     }
// //   }, []);

// //   // Debounced fetch with minimal delay for faster response
// //   const debouncedFetchDashboardData = useMemo(
// //     () => debounce(processDashboardData, 100),
// //     [processDashboardData]
// //   );

// //   useEffect(() => {
// //     debouncedFetchDashboardData(selectedYear, startMonth, endMonth);
// //     const timer = setTimeout(() => {
// //       setIsChartRendered(true);
// //     }, 100);
// //     return () => clearTimeout(timer);
// //   }, [selectedYear, startMonth, endMonth, debouncedFetchDashboardData]);

// //   useEffect(() => {
// //     if (!loading && isChartRendered) {
// //       renderPatientTypeChart();
// //       renderCommentsChart();
// //       renderTimelineChart();
// //       if (casualityData.length > 0) {
// //         renderCasualityChart();
// //       }
// //     }
// //   }, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData]);

// //   const renderCommentsChart = useCallback(() => {
// //     if (!commentsChartRef.current) return;

// //     d3.select(commentsChartRef.current).selectAll("*").remove();

// //     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
// //       d3.select(commentsChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// //     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 370 - margin.top - margin.bottom;
// //     const radius = Math.min(width, height) / 2;

// //     const svg = d3.select(commentsChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// //     const total = commentsData.reduce((sum, d) => sum + d.count, 0);
// //     commentsData.forEach(d => {
// //       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
// //     });

// //     const commentsColors = {
// //       "ICSR": "#14242c",
// //       "AOI": "#4178a9",
// //       "Others": "#26455e"
// //     };

// //     const pie = d3.pie()
// //       .value(d => d.count)
// //       .sort(null)
// //       .padAngle(0.03);

// //     const arc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.8)
// //       .cornerRadius(4);

// //     const hoverArc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.85)
// //       .cornerRadius(4);

// //     const path = svg.selectAll(".arc")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "arc");

// //     path.append("path")
// //       .attr("d", arc)
// //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// //       .attr("stroke", "#fff")
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0.9)
// //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", hoverArc)
// //           .style("opacity", 1);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.data.status}</div>
// //             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
// //           </div>
// //         `;

// //         d3.select("#comments-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", arc)
// //           .style("opacity", 0.9);

// //         d3.select("#comments-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(1000)
// //       .attrTween("d", function(d) {
// //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// //         return function(t) {
// //           return arc(interpolate(t));
// //         };
// //       });

// //     const arcLabels = svg.selectAll(".arc-label")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("text")
// //       .attr("class", "arc-label")
// //       .attr("transform", d => {
// //         const centroid = arc.centroid(d);
// //         const x = centroid[0] * 1.0;
// //         const y = centroid[1] * 1.0;
// //         return `translate(${x}, ${y})`;
// //       })
// //       .attr("dy", "0.35em")
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "11px")
// //       .style("font-weight", "bold")
// //       .style("fill", "#fff")
// //       .style("pointer-events", "none")
// //       .style("opacity", 0)
// //       .text(d => d.data.count)
// //       .transition()
// //       .delay(1000)
// //       .duration(500)
// //       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

// //     commentsData.forEach((d, i) => {
// //       if (d.status === "ICSR" && d.percentage < 3) {
// //         const pieData = pie(commentsData)[i];
// //         const centroid = arc.centroid(pieData);
// //         const x = centroid[0] * 1.5;
// //         const y = centroid[1] * 1.5;

// //         svg.append("line")
// //           .attr("x1", centroid[0])
// //           .attr("y1", centroid[1])
// //           .attr("x2", x)
// //           .attr("y2", y)
// //           .attr("stroke", "#14242c")
// //           .attr("stroke-width", 1.5)
// //           .attr("opacity", 0)
// //           .transition()
// //           .delay(1000)
// //           .duration(500)
// //           .attr("opacity", 1);

// //         svg.append("text")
// //           .attr("x", x + 10)
// //           .attr("y", y)
// //           .attr("text-anchor", "start")
// //           .attr("alignment-baseline", "middle")
// //           .style("font-size", "12px")
// //           .style("font-weight", "bold")
// //           .style("fill", "#14242c")
// //           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
// //           .attr("opacity", 0)
// //           .transition()
// //           .delay(1100)
// //           .duration(500)
// //           .attr("opacity", 1);
// //       }
// //     });

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.5em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Comments");

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Distribution");

// //     const legend = svg.selectAll(".legend")
// //       .data(pie(commentsData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "legend")
// //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// //     legend.append("rect")
// //       .attr("width", 15)
// //       .attr("height", 15)
// //       .attr("rx", 3)
// //       .attr("fill", d => commentsColors[d.data.status] || "#386790")
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1000 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 12)
// //       .text(d => `${d.data.status}: ${d.data.count}`)
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR)
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1100 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     if (!document.getElementById("comments-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "comments-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [commentsData]);

// //   const renderTimelineChart = useCallback(() => {
// //     if (!timelineChartRef.current) return;

// //     const filteredData = timelineData.filter(d => d.year === selectedYear);
// //     const monthRangeFilteredData = filteredData.filter(d => d.month >= startMonth && d.month <= endMonth);
// //     const finalFilteredData = emailFilter !== null
// //       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
// //       : monthRangeFilteredData;

// //     if (finalFilteredData.length === 0) {
// //       d3.select(timelineChartRef.current).selectAll("*").remove();
// //       d3.select(timelineChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     finalFilteredData.sort((a, b) => {
// //       if (a.year !== b.year) return a.year - b.year;
// //       return a.month - b.month;
// //     });

// //     d3.select(timelineChartRef.current).selectAll("*").remove();

// //     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
// //     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;

// //     const svg = d3.select(timelineChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     const x = d3.scalePoint()
// //       .domain(finalFilteredData.map(d => d.displayDate))
// //       .range([0, width])
// //       .padding(0.5);

// //     const yArticles = d3.scaleLinear()
// //       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
// //       .range([height, 0]);

// //     const yEmails = d3.scaleLinear()
// //       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
// //       .range([height, 0]);

// //     svg.append("g")
// //       .attr("class", "grid")
// //       .attr("opacity", 0.1)
// //       .call(d3.axisLeft(yArticles)
// //         .ticks(5)
// //         .tickSize(-width)
// //         .tickFormat(""))
// //       .select(".domain")
// //       .remove();

// //     svg.append("g")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll(".tick text")
// //       .style("text-anchor", "end")
// //       .style("font-size", "12px")
// //       .style("font-weight", "400")
// //       .style("fill", TEXT_COLOR)
// //       .attr("dy", "0.5em")
// //       .attr("dx", "-0.8em")
// //       .attr("transform", "rotate(-45)");

// //     svg.append("g")
// //       .call(d3.axisLeft(yArticles)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.append("text")
// //       .attr("transform", "rotate(-90)")
// //       .attr("y", -margin.left + 15)
// //       .attr("x", -height / 2)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Articles");

// //     svg.append("g")
// //       .attr("transform", `translate(${width}, 0)`)
// //       .call(d3.axisRight(yEmails)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.append("text")
// //       .attr("transform", "rotate(-90)")
// //       .attr("y", width + margin.right - 15)
// //       .attr("x", -height / 2)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", ACCENT_COLOR)
// //       .text("Emails");

// //     svg.selectAll("g.tick text")
// //       .style("font-size", "12px")
// //       .style("fill", MUTED_TEXT);

// //     const articleLine = d3.line()
// //       .x(d => x(d.displayDate))
// //       .y(d => yArticles(d.count))
// //       .curve(d3.curveMonotoneX);

// //     const emailLine = d3.line()
// //       .x(d => x(d.displayDate))
// //       .y(d => yEmails(d.emailCount))
// //       .curve(d3.curveMonotoneX);

// //     const defs = svg.append("defs");

// //     const articleGradient = defs.append("linearGradient")
// //       .attr("id", "article-line-gradient")
// //       .attr("gradientUnits", "userSpaceOnUse")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 0)
// //       .attr("y2", height);

// //     articleGradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", PRIMARY_COLOR);

// //     articleGradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", PRIMARY_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     const emailGradient = defs.append("linearGradient")
// //       .attr("id", "email-line-gradient")
// //       .attr("gradientUnits", "userSpaceOnUse")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 0)
// //       .attr("y2", height);

// //     emailGradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", ACCENT_COLOR);

// //     emailGradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", ACCENT_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     const articlePath = svg.append("path")
// //       .datum(finalFilteredData)
// //       .attr("fill", "none")
// //       .attr("stroke", "url(#article-line-gradient)")
// //       .attr("stroke-width", 3)
// //       .attr("stroke-linejoin", "round")
// //       .attr("stroke-linecap", "round")
// //       .attr("d", articleLine)
// //       .style("opacity", 0.8)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

// //     const articlePathLength = articlePath.node().getTotalLength();
// //     articlePath
// //       .attr("stroke-dasharray", articlePathLength)
// //       .attr("stroke-dashoffset", articlePathLength)
// //       .transition()
// //       .duration(1500)
// //       .attr("stroke-dashoffset", 0);

// //     const emailPath = svg.append("path")
// //       .datum(finalFilteredData)
// //       .attr("fill", "none")
// //       .attr("stroke", "url(#email-line-gradient)")
// //       .attr("stroke-width", 3)
// //       .attr("stroke-linejoin", "round")
// //       .attr("stroke-linecap", "round")
// //       .attr("stroke-dasharray", "5,5")
// //       .attr("d", emailLine)
// //       .style("opacity", 0.8);

// //     const emailPathLength = emailPath.node().getTotalLength();
// //     emailPath
// //       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
// //       .attr("stroke-dashoffset", emailPathLength)
// //       .transition()
// //       .duration(1500)
// //       .delay(300)
// //       .attr("stroke-dasharray", "5,5")
// //       .attr("stroke-dashoffset", 0);

// //     svg.selectAll(".article-point")
// //       .data(finalFilteredData)
// //       .enter()
// //       .append("circle")
// //       .attr("class", "article-point")
// //       .attr("cx", d => x(d.displayDate))
// //       .attr("cy", d => yArticles(d.count))
// //       .attr("r", 5)
// //       .attr("fill", "#fff")
// //       .attr("stroke", PRIMARY_COLOR)
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 7)
// //           .attr("stroke-width", 3);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.displayDate}</div>
// //             <div>Articles: ${d.count}</div>
// //             <div>Emails: ${d.emailCount}</div>
// //           </div>
// //         `;

// //         d3.select("#timeline-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 5)
// //           .attr("stroke-width", 2);

// //         d3.select("#timeline-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(300)
// //       .delay((d, i) => 1500 + i * 50)
// //       .style("opacity", 1);

// //     svg.selectAll(".email-point")
// //       .data(finalFilteredData)
// //       .enter()
// //       .append("circle")
// //       .attr("class", "email-point")
// //       .attr("cx", d => x(d.displayDate))
// //       .attr("cy", d => yEmails(d.emailCount))
// //       .attr("r", 4)
// //       .attr("fill", "#fff")
// //       .attr("stroke", ACCENT_COLOR)
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0)
// //       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 6)
// //           .attr("stroke-width", 3);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.displayDate}</div>
// //             <div>Articles: ${d.count}</div>
// //             <div>Emails: ${d.emailCount}</div>
// //           </div>
// //         `;

// //         d3.select("#timeline-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("r", 4)
// //           .attr("stroke-width", 2);

// //         d3.select("#timeline-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(300)
// //       .delay((d, i) => 1800 + i * 50)
// //       .style("opacity", 1);

// //     const legend = svg.append("g")
// //       .attr("transform", `translate(${width - 120}, 10)`);

// //     legend.append("line")
// //       .attr("x1", 0)
// //       .attr("y1", 0)
// //       .attr("x2", 20)
// //       .attr("y2", 0)
// //       .attr("stroke", PRIMARY_COLOR)
// //       .attr("stroke-width", 3);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 4)
// //       .text("Articles")
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR);

// //     legend.append("line")
// //       .attr("x1", 0)
// //       .attr("y1", 20)
// //       .attr("x2", 20)
// //       .attr("y2", 20)
// //       .attr("stroke", ACCENT_COLOR)
// //       .attr("stroke-width", 3)
// //       .attr("stroke-dasharray", "5,5");

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 24)
// //       .text("Emails")
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR);

// //     if (!document.getElementById("timeline-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "timeline-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [timelineData, selectedYear, startMonth, endMonth, emailFilter]);

// //   const renderPatientTypeChart = useCallback(() => {
// //     if (!patientTypeChartRef.current) return;

// //     d3.select(patientTypeChartRef.current).selectAll("*").remove();

// //     if (patientTypeData.length === 0) {
// //       d3.select(patientTypeChartRef.current)
// //         .append("div")
// //         .attr("class", "flex justify-center items-center h-full")
// //         .append("p")
// //         .attr("class", "text-gray-500")
// //         .text("No data available for the selected filters");
// //       return;
// //     }

// //     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
// //     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;

// //     const svg = d3.select(patientTypeChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${margin.left},${margin.top})`);

// //     const x = d3.scaleBand()
// //       .domain(patientTypeData.map(d => d.type))
// //       .range([0, width])
// //       .padding(0.4);

// //     const y = d3.scaleLinear()
// //       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
// //       .range([height, 0]);

// //     svg.append("g")
// //       .attr("class", "grid")
// //       .attr("opacity", 0.1)
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickSize(-width)
// //         .tickFormat(""))
// //       .select(".domain")
// //       .remove();

// //     svg.append("g")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll(".tick text")
// //       .style("text-anchor", "end")
// //       .style("font-size", "12px")
// //       .style("font-weight", "400")
// //       .style("fill", TEXT_COLOR)
// //       .attr("dy", ".5em")
// //       .attr("dx", "-.8em")
// //       .attr("transform", "rotate(-25)");

// //     svg.append("g")
// //       .call(d3.axisLeft(y)
// //         .ticks(5)
// //         .tickFormat(d => d)
// //         .tickSize(0))
// //       .select(".domain")
// //       .attr("stroke", BORDER_COLOR);

// //     svg.selectAll("g.tick text")
// //       .style("font-size", "12px")
// //       .style("fill", MUTED_TEXT);

// //     const defs = svg.append("defs");

// //     const gradient = defs.append("linearGradient")
// //       .attr("id", "bar-gradient")
// //       .attr("x1", "0%")
// //       .attr("y1", "0%")
// //       .attr("x2", "0%")
// //       .attr("y2", "100%");

// //     gradient.append("stop")
// //       .attr("offset", "0%")
// //       .attr("stop-color", ACCENT_COLOR)
// //       .attr("stop-opacity", 1);

// //     gradient.append("stop")
// //       .attr("offset", "100%")
// //       .attr("stop-color", PRIMARY_COLOR)
// //       .attr("stop-opacity", 0.8);

// //     defs.append("filter")
// //       .attr("id", "shadow")
// //       .append("feDropShadow")
// //       .attr("dx", "0")
// //       .attr("dy", "2")
// //       .attr("stdDeviation", "2")
// //       .attr("flood-opacity", "0.2");

// //     svg.selectAll(".bar")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("rect")
// //       .attr("class", "bar")
// //       .attr("x", d => x(d.type))
// //       .attr("width", x.bandwidth())
// //       .attr("y", height)
// //       .attr("height", 0)
// //       .attr("rx", 4)
// //       .attr("fill", "url(#bar-gradient)")
// //       .attr("filter", "url(#shadow)")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", ACCENT_COLOR);

// //         const tooltip = d3.select("body").select(".tooltip");
// //         tooltip
// //           .style("opacity", 1)
// //           .html(`<strong>${d.type}:</strong> ${d.count}`)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("fill", "url(#bar-gradient)");

// //         d3.select("body").select(".tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => i * 100)
// //       .attr("y", d => y(d.count))
// //       .attr("height", d => height - y(d.count));

// //     svg.selectAll(".value-label")
// //       .data(patientTypeData)
// //       .enter()
// //       .append("text")
// //       .attr("class", "value-label")
// //       .attr("x", d => x(d.type) + x.bandwidth() / 2)
// //       .attr("y", d => y(d.count) - 8)
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .style("opacity", 0)
// //       .text(d => d.count)
// //       .transition()
// //       .duration(800)
// //       .delay((d, i) => 200 + i * 100)
// //       .style("opacity", 1);

// //     if (!d3.select("body").select(".tooltip").node()) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("class", "tooltip")
// //         .style("position", "absolute")
// //         .style("padding", "8px")
// //         .style("background", "white")
// //         .style("border-radius", "4px")
// //         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
// //         .style("font-size", "12px")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [patientTypeData]);

// //   const renderCasualityChart = useCallback(() => {
// //     if (!casualityChartRef.current || casualityData.length === 0) return;

// //     d3.select(casualityChartRef.current).selectAll("*").remove();

// //     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
// //     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
// //     const height = 350 - margin.top - margin.bottom;
// //     const radius = Math.min(width, height) / 2;

// //     const svg = d3.select(casualityChartRef.current)
// //       .append("svg")
// //       .attr("width", width + margin.left + margin.right)
// //       .attr("height", height + margin.top + margin.bottom)
// //       .append("g")
// //       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

// //     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
// //     casualityData.forEach(d => {
// //       d.percentage = (d.count / total) * 100;
// //     });

// //     const color = d3.scaleOrdinal()
// //       .domain(casualityData.map(d => d.status))
// //       .range(COLOR_PALETTE);

// //     const pie = d3.pie()
// //       .value(d => d.count)
// //       .sort(null);

// //     const arc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.8);

// //     const hoverArc = d3.arc()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.85);

// //     const labelArc = d3.arc()
// //       .innerRadius(radius * 0.9)
// //       .outerRadius(radius * 0.9);

// //     const path = svg.selectAll(".arc")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "arc");

// //     path.append("path")
// //       .attr("d", arc)
// //       .attr("fill", d => color(d.data.status))
// //       .attr("stroke", "#fff")
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0.9)
// //       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
// //       .on("mouseover", function(event, d) {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", hoverArc)
// //           .style("opacity", 1);

// //         const tooltipContent = `
// //           <div class="p-2">
// //             <div class="font-bold">${d.data.status}</div>
// //             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
// //           </div>
// //         `;

// //         d3.select("#casuality-tooltip")
// //           .style("opacity", 1)
// //           .style("left", `${event.pageX + 10}px`)
// //           .style("top", `${event.pageY - 28}px`)
// //           .html(tooltipContent);
// //       })
// //       .on("mouseout", function() {
// //         d3.select(this)
// //           .transition()
// //           .duration(200)
// //           .attr("d", arc)
// //           .style("opacity", 0.9);

// //         d3.select("#casuality-tooltip").style("opacity", 0);
// //       })
// //       .transition()
// //       .duration(1000)
// //       .attrTween("d", function(d) {
// //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// //         return function(t) {
// //           return arc(interpolate(t));
// //         };
// //       });

// //     svg.selectAll(".percentage-label")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("text")
// //       .attr("class", "percentage-label")
// //       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
// //       .attr("dy", "0.35em")
// //       .attr("text-anchor", "middle")
// //       .style("font-size", "12px")
// //       .style("font-weight", "bold")
// //       .style("fill", "#000")
// //       .style("pointer-events", "none")
// //       .style("opacity", 0)
// //       .text(d => `${Math.round(d.data.percentage)}%`)
// //       .transition()
// //       .delay(1000)
// //       .duration(500)
// //       .style("opacity", 1);

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.5em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Casuality");

// //     svg.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1em")
// //       .style("font-size", "14px")
// //       .style("font-weight", "bold")
// //       .style("fill", PRIMARY_COLOR)
// //       .text("Validation");

// //     const legend = svg.selectAll(".legend")
// //       .data(pie(casualityData))
// //       .enter()
// //       .append("g")
// //       .attr("class", "legend")
// //       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

// //     legend.append("rect")
// //       .attr("width", 15)
// //       .attr("height", 15)
// //       .attr("rx", 3)
// //       .attr("fill", d => color(d.data.status))
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1000 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     legend.append("text")
// //       .attr("x", 25)
// //       .attr("y", 12)
// //       .text(d => d.data.status)
// //       .style("font-size", "12px")
// //       .style("font-weight", "medium")
// //       .style("fill", TEXT_COLOR)
// //       .style("opacity", 0)
// //       .transition()
// //       .delay((d, i) => 1100 + i * 100)
// //       .duration(500)
// //       .style("opacity", 1);

// //     if (!document.getElementById("casuality-tooltip")) {
// //       d3.select("body")
// //         .append("div")
// //         .attr("id", "casuality-tooltip")
// //         .style("position", "absolute")
// //         .style("background", "white")
// //         .style("padding", "5px")
// //         .style("border-radius", "5px")
// //         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
// //         .style("pointer-events", "none")
// //         .style("opacity", 0)
// //         .style("z-index", 10);
// //     }
// //   }, [casualityData]);

// //   const currentDate = new Date().toLocaleDateString('en-US', {
// //     weekday: 'long',
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

// //   const handleCardClick = route => navigate(route);

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
// //       <div className="fadeIn mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
// //         <div className="flex items-center mt-2">
// //           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
// //           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
// //         </div>
// //       </div>

// //       <div className="fadeIn mb-8 bg-white rounded-lg shadow-sm p-4">
// //         <div className="flex flex-wrap gap-2 items-center">
// //           <select
// //             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// //           >
// //             {availableYears.map(year => (
// //               <option key={year} value={year}>{year}</option>
// //             ))}
// //           </select>

// //           <select
// //             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //             value={startMonth}
// //             onChange={(e) => setStartMonth(parseInt(e.target.value))}
// //           >
// //             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// //               <option key={month} value={month}>
// //                 From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// //               </option>
// //             ))}
// //           </select>

// //           <select
// //             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
// //             value={endMonth}
// //             onChange={(e) => setEndMonth(parseInt(e.target.value))}
// //           >
// //             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
// //               <option key={month} value={month}>
// //                 To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
// //               </option>
// //             ))}
// //           </select>

// //           <button
// //             className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
// //             onClick={() => {
// //               setSelectedYear(new Date().getFullYear());
// //               setStartMonth(1);
// //               setEndMonth(12);
// //               setSelectedMonth(null);
// //               setEmailFilter(null);
// //             }}
// //           >
// //             Reset Filters
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="relative">
// //             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
// //             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '100ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/literature-review')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <Mail size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
// //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
// //                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>

// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '200ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/cases')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <FileText size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
// //                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
// //                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>

// //             <div
// //               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
// //               style={{ animationDelay: '300ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
// //               onClick={() => handleCardClick('/medical-review')}
// //             >
// //               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
// //               <div className="relative z-10 flex items-start">
// //                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
// //                   <AlertCircle size={20} className="text-white" />
// //                 </div>
// //                 <div className="flex-grow">
// //                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
// //                   <div className="flex items-center space-x-2">
// //                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
// //                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
// //                       Total: {stats.icsrCount + stats.aoiCount}
// //                     </span>
// //                   </div>
// //                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
// //                 </div>
// //                 <ChevronRight size={18} className="text-blue-900 self-center" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <Users size={18} className="mr-2 text-blue-900" />
// //                   Patient Type Distribution
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
// //                 </div>
// //               </div>
// //               <div className="h-80" ref={patientTypeChartRef}></div>
// //             </div>

// //             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                   <MessageSquare size={18} className="mr-2 text-blue-900" />
// //                   Comments Distribution
// //                 </h3>
// //                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
// //                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
// //                 </div>
// //               </div>
// //               <div className="h-72" ref={commentsChartRef}></div>
// //             </div>
// //           </div>

// //           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-lg font-medium text-gray-800 flex items-center">
// //                 <Calendar size={18} className="mr-2 text-blue-900" />
// //                 Monthly Article Processing
// //               </h3>
// //             </div>
// //             <div className="h-80" ref={timelineChartRef}></div>
// //           </div>
// //         </>
// //       )}

// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }

// //         @keyframes slideInUp {
// //           from { opacity: 0; transform: translateY(15px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }

// //         @keyframes growWidth {
// //           from { width: 0; }
// //           to { width: 100%; }
// //         }

// //         .fadeIn {
// //           opacity: 0;
// //           animation: fadeIn 0.7s ease-out forwards;
// //         }

// //         .slideInUp {
// //           opacity: 0;
// //           animation: slideInUp 0.7s ease-out forwards;
// //         }

// //         .growWidth {
// //           width: 0;
// //           animation: growWidth 1s ease-out forwards;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Home;
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import * as d3 from 'd3';
// import { debounce } from 'lodash';
// import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';

// const Home = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     eMailCount: 0,
//     articleCount: 0,
//     icsrCount: 0,
//     aoiCount: 0
//   });
//   const [startMonth, setStartMonth] = useState(1);
//   const [endMonth, setEndMonth] = useState(12);
//   const [patientTypeData, setPatientTypeData] = useState([]);
//   const [casualityData, setCasualityData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isChartRendered, setIsChartRendered] = useState(false);
//   const [commentsData, setCommentsData] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [availableYears, setAvailableYears] = useState([]);
//   const [emailFilter, setEmailFilter] = useState(null);

//   // Refs for chart containers
//   const patientTypeChartRef = useRef(null);
//   const casualityChartRef = useRef(null);
//   const commentsChartRef = useRef(null);
//   const timelineChartRef = useRef(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: getLastSevenDaysStart(),
//     endDate: new Date().toISOString().split('T')[0]
//   });
  
//   // Function to get last 7 days (same as in CasesContent.js)
//   function getLastSevenDaysStart() {
//     const now = new Date();
//     const sevenDaysAgo = new Date(now);
//     sevenDaysAgo.setDate(now.getDate() - 6);
//     return sevenDaysAgo.toISOString().split('T')[0];
//   }
//   // Color constants
//   const PRIMARY_COLOR = '#14242c';
//   const COLOR_PALETTE = useMemo(() => [
//     '#14242c',
//     '#386790',
//     '#26455e',
//     '#2f5677',
//     '#386790',
//     '#4178a9'
//   ], []);
//   const ACCENT_COLOR = '#4178a9';
//   const LIGHT_BG = '#f8fafc';
//   const TEXT_COLOR = '#2c3e50';
//   const MUTED_TEXT = '#64748b';
//   const BORDER_COLOR = '#e2e8f0';

//   // Cache for raw data
//   const rawDataCache = useRef(null);

//   // Fetch and preprocess raw data once
//   const fetchRawData = useCallback(async () => {
//     if (rawDataCache.current) {
//       return rawDataCache.current;
//     }

//     try {
//       setLoading(true);
//       const data = await DatabaseService.fetchLiteratureReviews();

//       const processedData = data.map(item => {
//         const dateField = "Validation Processing Date";
//         let date, year, month, displayDate;
//         if (item[dateField]) {
//           const dateStr = item[dateField].toString();
//           if (dateStr) {
//             date = new Date(dateStr);
//             if (!isNaN(date.getTime())) {
//               year = date.getFullYear();
//               month = date.getMonth() + 1;
//               displayDate = date.toLocaleString('default', { month: 'short', year: 'numeric' });
//             }
//           }
//         }

//         const commentsField = "Comments (ICSR, AOI, Not selected)";
//         const comments = item[commentsField] ? item[commentsField].toString().toUpperCase() : 'Others';

//         const patientTypeField = Object.keys(item).find(key =>
//           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
//         );
//         const patientType = patientTypeField && item[patientTypeField] ? item[patientTypeField].toString().trim() : 'Unknown';

//         return {
//           date,
//           year,
//           month,
//           displayDate,
//           email: item.Mail,
//           comments,
//           patientType
//         };
//       }).filter(item => item.date && !isNaN(item.date.getTime()));

//       rawDataCache.current = processedData;
//       setLoading(false);
//       return processedData;
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setLoading(false);
//       return [];
//     }
//   }, []);

//   // Process data for charts based on filters
//   const processDashboardData = useCallback(async (year, start, end) => {
//     const rawData = await fetchRawData();

//     const uniqueEMails = new Set();
//     let icsrCount = 0;
//     let aoiCount = 0;
//     const patientTypeCounts = {};
//     const commentsCounts = { ICSR: 0, AOI: 0, Others: 0 };
//     const timelineDataByMonth = {};
//     const emailsByDate = {};
//     const allYears = new Set();

//     rawData.forEach(item => {
//       const { year: itemYear, month, email, comments, patientType, displayDate } = item;
//       allYears.add(itemYear);

//       if (itemYear === year && month >= start && month <= end) {
//         if (email) uniqueEMails.add(email);

//         const yearMonthKey = `${itemYear}-${month - 1}`;
//         if (!timelineDataByMonth[yearMonthKey]) {
//           timelineDataByMonth[yearMonthKey] = {
//             year: itemYear,
//             month,
//             count: 0,
//             displayDate,
//             emailCount: 0
//           };
//         }
//         timelineDataByMonth[yearMonthKey].count++;

//         if (!emailsByDate[yearMonthKey]) emailsByDate[yearMonthKey] = new Set();
//         if (email) emailsByDate[yearMonthKey].add(email);

//         if (comments.includes('ICSR')) {
//           icsrCount++;
//           commentsCounts.ICSR++;
//         } else if (comments.includes('AOI')) {
//           aoiCount++;
//           commentsCounts.AOI++;
//         } else {
//           commentsCounts.Others++;
//         }

//         if (patientType) {
//           patientTypeCounts[patientType] = (patientTypeCounts[patientType] || 0) + 1;
//         }
//       }
//     });

//     Object.keys(timelineDataByMonth).forEach(key => {
//       timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
//     });

//     const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
//       if (a.year !== b.year) return a.year - b.year;
//       return a.month - b.month;
//     });

//     setStats({
//       eMailCount: uniqueEMails.size,
//       articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
//       icsrCount,
//       aoiCount
//     });
//     setPatientTypeData(Object.entries(patientTypeCounts).map(([type, count]) => ({ type, count })));
//     setCommentsData(Object.entries(commentsCounts).map(([status, count]) => ({ status, count })));
//     setTimelineData(timelineArray);
//     setAvailableYears(Array.from(allYears).sort());
//   }, []);

//   // Debounced data processing with reduced delay
//   const debouncedProcessDashboardData = useMemo(
//     () => debounce(processDashboardData, 50),
//     [processDashboardData]
//   );

//   // Trigger data processing on filter change
//   useEffect(() => {
//     debouncedProcessDashboardData(selectedYear, startMonth, endMonth);
//     const timer = setTimeout(() => setIsChartRendered(true), 50);
//     return () => clearTimeout(timer);
//   }, [selectedYear, startMonth, endMonth, debouncedProcessDashboardData]);

//   // Render charts when data is ready
//   useEffect(() => {
//     if (!loading && isChartRendered) {
//       renderPatientTypeChart();
//       renderCommentsChart();
//       renderTimelineChart();
//       if (casualityData.length > 0) renderCasualityChart();
//     }
//   }, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData, emailFilter]);

//   // Timeline chart rendering
//   const renderTimelineChart = useCallback(() => {
//     if (!timelineChartRef.current) return;

//     const filteredData = timelineData.filter(d => d.year === selectedYear);
//     const monthRangeFilteredData = filteredData.filter(d => d.month >= startMonth && d.month <= endMonth);
//     const finalFilteredData = emailFilter !== null
//       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
//       : monthRangeFilteredData;

//     if (finalFilteredData.length === 0) {
//       d3.select(timelineChartRef.current).selectAll("*").remove();
//       d3.select(timelineChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     finalFilteredData.sort((a, b) => {
//       if (a.year !== b.year) return a.year - b.year;
//       return a.month - b.month;
//     });

//     d3.select(timelineChartRef.current).selectAll("*").remove();

//     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
//     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     const svg = d3.select(timelineChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scalePoint()
//       .domain(finalFilteredData.map(d => d.displayDate))
//       .range([0, width])
//       .padding(0.5);

//     const yArticles = d3.scaleLinear()
//       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
//       .range([height, 0]);

//     const yEmails = d3.scaleLinear()
//       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
//       .range([height, 0]);

//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(yArticles)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll(".tick text")
//       .style("text-anchor", "end")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", "0.5em")
//       .attr("dx", "-0.asonic")
//       .attr("transform", "rotate(-45)");

//     svg.append("g")
//       .call(d3.axisLeft(yArticles)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", -margin.left + 15)
//       .attr("x", -height / 2)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Articles");

//     svg.append("g")
//       .attr("transform", `translate(${width}, 0)`)
//       .call(d3.axisRight(yEmails)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", width + margin.right - 15)
//       .attr("x", -height / 2)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", ACCENT_COLOR)
//       .text("Emails");

//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     const articleLine = d3.line()
//       .x(d => x(d.displayDate))
//       .y(d => yArticles(d.count))
//       .curve(d3.curveMonotoneX);

//     const emailLine = d3.line()
//       .x(d => x(d.displayDate))
//       .y(d => yEmails(d.emailCount))
//       .curve(d3.curveMonotoneX);

//     const defs = svg.append("defs");

//     const articleGradient = defs.append("linearGradient")
//       .attr("id", "article-line-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height);

//     articleGradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", PRIMARY_COLOR);

//     articleGradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     const emailGradient = defs.append("linearGradient")
//       .attr("id", "email-line-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height);

//     emailGradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR);

//     emailGradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 0.8);

//     const articlePath = svg.append("path")
//       .datum(finalFilteredData)
//       .attr("fill", "none")
//       .attr("stroke", "url(#article-line-gradient)")
//       .attr("stroke-width", 3)
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("d", articleLine)
//       .style("opacity", 0.8)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

//     const articlePathLength = articlePath.node().getTotalLength();
//     articlePath
//       .attr("stroke-dasharray", articlePathLength)
//       .attr("stroke-dashoffset", articlePathLength)
//       .transition()
//       .duration(1500)
//       .attr("stroke-dashoffset", 0);

//     const emailPath = svg.append("path")
//       .datum(finalFilteredData)
//       .attr("fill", "none")
//       .attr("stroke", "url(#email-line-gradient)")
//       .attr("stroke-width", 3)
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("stroke-dasharray", "5,5")
//       .attr("d", emailLine)
//       .style("opacity", 0.8);

//     const emailPathLength = emailPath.node().getTotalLength();
//     emailPath
//       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
//       .attr("stroke-dashoffset", emailPathLength)
//       .transition()
//       .duration(1500)
//       .delay(300)
//       .attr("stroke-dasharray", "5,5")
//       .attr("stroke-dashoffset", 0);

//     svg.selectAll(".article-point")
//       .data(finalFilteredData)
//       .enter()
//       .append("circle")
//       .attr("class", "article-point")
//       .attr("cx", d => x(d.displayDate))
//       .attr("cy", d => yArticles(d.count))
//       .attr("r", 5)
//       .attr("fill", "#fff")
//       .attr("stroke", PRIMARY_COLOR)
//       .attr("stroke-width", 2)
//       .style("opacity", 0)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 7)
//           .attr("stroke-width", 3);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.displayDate}</div>
//             <div>Articles: ${d.count}</div>
//             <div>Emails: ${d.emailCount}</div>
//           </div>
//         `;

//         d3.select("#timeline-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 5)
//           .attr("stroke-width", 2);

//         d3.select("#timeline-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(300)
//       .delay((d, i) => 1500 + i * 50)
//       .style("opacity", 1);

//     svg.selectAll(".email-point")
//       .data(finalFilteredData)
//       .enter()
//       .append("circle")
//       .attr("class", "email-point")
//       .attr("cx", d => x(d.displayDate))
//       .attr("cy", d => yEmails(d.emailCount))
//       .attr("r", 4)
//       .attr("fill", "#fff")
//       .attr("stroke", ACCENT_COLOR)
//       .attr("stroke-width", 2)
//       .style("opacity", 0)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 6)
//           .attr("stroke-width", 3);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.displayDate}</div>
//             <div>Articles: ${d.count}</div>
//             <div>Emails: ${d.emailCount}</div>
//           </div>
//         `;

//         d3.select("#timeline-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 4)
//           .attr("stroke-width", 2);

//         d3.select("#timeline-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(300)
//       .delay((d, i) => 1800 + i * 50)
//       .style("opacity", 1);

//     const legend = svg.append("g")
//       .attr("transform", `translate(${width - 120}, 10)`);

//     legend.append("line")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 20)
//       .attr("y2", 0)
//       .attr("stroke", PRIMARY_COLOR)
//       .attr("stroke-width", 3);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 4)
//       .text("Articles")
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR);

//     legend.append("line")
//       .attr("x1", 0)
//       .attr("y1", 20)
//       .attr("x2", 20)
//       .attr("y2", 20)
//       .attr("stroke", ACCENT_COLOR)
//       .attr("stroke-width", 3)
//       .attr("stroke-dasharray", "5,5");

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 24)
//       .text("Emails")
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR);

//     if (!document.getElementById("timeline-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "timeline-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [timelineData, selectedYear, startMonth, endMonth, emailFilter]);

//   // Patient type chart rendering
//   const renderPatientTypeChart = useCallback(() => {
//     if (!patientTypeChartRef.current) return;

//     d3.select(patientTypeChartRef.current).selectAll("*").remove();

//     if (patientTypeData.length === 0) {
//       d3.select(patientTypeChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
//     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     const svg = d3.select(patientTypeChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleBand()
//       .domain(patientTypeData.map(d => d.type))
//       .range([0, width])
//       .padding(0.4);

//     const y = d3.scaleLinear()
//       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
//       .range([height, 0]);

//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll(".tick text")
//       .style("text-anchor", "end")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", ".5em")
//       .attr("dx", "-.8em")
//       .attr("transform", "rotate(-25)");

//     svg.append("g")
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     const defs = svg.append("defs");

//     const gradient = defs.append("linearGradient")
//       .attr("id", "bar-gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "0%")
//       .attr("y2", "100%");

//     gradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 1);

//     gradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     defs.append("filter")
//       .attr("id", "shadow")
//       .append("feDropShadow")
//       .attr("dx", "0")
//       .attr("dy", "2")
//       .attr("stdDeviation", "2")
//       .attr("flood-opacity", "0.2");

//       svg.selectAll(".bar")
//       .data(patientTypeData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.type))
//       .attr("width", x.bandwidth())
//       .attr("y", height)
//       .attr("height", 0)
//       .attr("rx", 4)
//       .attr("fill", "url(#bar-gradient)")
//       .attr("filter", "url(#shadow)")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", ACCENT_COLOR);
    
//         const tooltip = d3.select("body").select(".tooltip");
//         tooltip
//           .style("opacity", 1)
//           .html(`<strong>${d.type}:</strong> ${d.count}`)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", "url(#bar-gradient)");
    
//         d3.select("body").select(".tooltip").style("opacity", 0);
//       })
//       // .on("click", function(event, d) {
//       //   navigate(`/cases?patientType=${encodeURIComponent(d.type)}`);
//       // })
//       .on("click", function(event, d) {
//         const queryParams = new URLSearchParams();
//         queryParams.set('patientType', encodeURIComponent(d.type));
//         if (dateRange.startDate && dateRange.endDate) {
//           queryParams.set('startDate', dateRange.startDate);
//           queryParams.set('endDate', dateRange.endDate);
//         }
//         navigate(`/cases?${queryParams.toString()}`);
//       })
//       .transition()
//       .duration(800)
//       .delay((d, i) => i * 100)
//       .attr("y", d => y(d.count))
//       .attr("height", d => height - y(d.count));

//     svg.selectAll(".value-label")
//       .data(patientTypeData)
//       .enter()
//       .append("text")
//       .attr("class", "value-label")
//       .attr("x", d => x(d.type) + x.bandwidth() / 2)
//       .attr("y", d => y(d.count) - 8)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .style("opacity", 0)
//       .text(d => d.count)
//       .transition()
//       .duration(800)
//       .delay((d, i) => 200 + i * 100)
//       .style("opacity", 1);

//     if (!d3.select("body").select(".tooltip").node()) {
//       d3.select("body")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("position", "absolute")
//         .style("padding", "8px")
//         .style("background", "white")
//         .style("border-radius", "4px")
//         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
//         .style("font-size", "12px")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [patientTypeData]);

//   // Comments chart rendering
//   const renderCommentsChart = useCallback(() => {
//     if (!commentsChartRef.current) return;

//     d3.select(commentsChartRef.current).selectAll("*").remove();

//     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
//       d3.select(commentsChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
//     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 370 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(commentsChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = commentsData.reduce((sum, d) => sum + d.count, 0);
//     commentsData.forEach(d => {
//       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
//     });

//     const commentsColors = {
//       ICSR: "#14242c",
//       AOI: "#4178a9",
//       Others: "#26455e"
//     };

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null)
//       .padAngle(0.03);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8)
//       .cornerRadius(4);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85)
//       .cornerRadius(4);

//     const path = svg.selectAll(".arc")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//       path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);
    
//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
//           </div>
//         `;
    
//         d3.select("#comments-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);
    
//         d3.select("#comments-tooltip").style("opacity", 0);
//       })
//       .on("click", function(event, d) {
//         if (d.data.status === "ICSR" || d.data.status === "AOI") {
//           const queryParams = new URLSearchParams();
//           queryParams.set('comments', encodeURIComponent(d.data.status));
//           if (dateRange.startDate && dateRange.endDate) {
//             queryParams.set('startDate', dateRange.startDate);
//             queryParams.set('endDate', dateRange.endDate);
//           }
//           navigate(`/cases?${queryParams.toString()}`);
//         }
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     const arcLabels = svg.selectAll(".arc-label")
//       .data(pie(commentsData))
//       .enter()
//       .append("text")
//       .attr("class", "arc-label")
//       .attr("transform", d => {
//         const centroid = arc.centroid(d);
//         const x = centroid[0] * 1.0;
//         const y = centroid[1] * 1.0;
//         return `translate(${x}, ${y})`;
//       })
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "11px")
//       .style("font-weight", "bold")
//       .style("fill", "#fff")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => d.data.count)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

//     commentsData.forEach((d, i) => {
//       if (d.status === "ICSR" && d.percentage < 3) {
//         const pieData = pie(commentsData)[i];
//         const centroid = arc.centroid(pieData);
//         const x = centroid[0] * 1.5;
//         const y = centroid[1] * 1.5;

//         svg.append("line")
//           .attr("x1", centroid[0])
//           .attr("y1", centroid[1])
//           .attr("x2", x)
//           .attr("y2", y)
//           .attr("stroke", "#14242c")
//           .attr("stroke-width", 1.5)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1000)
//           .duration(500)
//           .attr("opacity", 1);

//         svg.append("text")
//           .attr("x", x + 10)
//           .attr("y", y)
//           .attr("text-anchor", "start")
//           .attr("alignment-baseline", "middle")
//           .style("font-size", "12px")
//           .style("font-weight", "bold")
//           .style("fill", "#14242c")
//           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1100)
//           .duration(500)
//           .attr("opacity", 1);
//       }
//     });

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Comments");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Distribution");

//     const legend = svg.selectAll(".legend")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => `${d.data.status}: ${d.data.count}`)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("comments-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "comments-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [commentsData]);

//   // Casuality chart rendering
//   const renderCasualityChart = useCallback(() => {
//     if (!casualityChartRef.current || casualityData.length === 0) return;

//     d3.select(casualityChartRef.current).selectAll("*").remove();

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(casualityChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
//     casualityData.forEach(d => {
//       d.percentage = (d.count / total) * 100;
//     });

//     const color = d3.scaleOrdinal()
//       .domain(casualityData.map(d => d.status))
//       .range(COLOR_PALETTE);

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85);

//     const labelArc = d3.arc()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9);

//     const path = svg.selectAll(".arc")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.status))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
//           </div>
//         `;

//         d3.select("#casuality-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);

//         d3.select("#casuality-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     svg.selectAll(".percentage-label")
//       .data(pie(casualityData))
//       .enter()
//       .append("text")
//       .attr("class", "percentage-label")
//       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", "#000")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => `${Math.round(d.data.percentage)}%`)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", 1);

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Casuality");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Validation");

//     const legend = svg.selectAll(".legend")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => color(d.data.status))
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => d.data.status)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("casuality-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "casuality-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [casualityData]);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

//   const handleCardClick = route => navigate(route);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
//       <div className="fadeIn mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
//         <div className="flex items-center mt-2">
//           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
//           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
//         </div>
//       </div>

//       <div className="fadeIn mb-8 bg-white rounded-lg shadow-sm p-4">
//         <div className="flex flex-wrap gap-2 items-center">
//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//           >
//             {availableYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={startMonth}
//             onChange={(e) => setStartMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={endMonth}
//             onChange={(e) => setEndMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <button
//             className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
//             onClick={() => {
//               setSelectedYear(new Date().getFullYear());
//               setStartMonth(1);
//               setEndMonth(12);
//               setSelectedMonth(null);
//               setEmailFilter(null);
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
//             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '100ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/literature-review')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <Mail size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '200ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/cases')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <FileText size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '300ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/medical-review')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <AlertCircle size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
//                   <div className="flex items-center space-x-2">
//                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
//                       Total: {stats.icsrCount + stats.aoiCount}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <Users size={18} className="mr-2 text-blue-900" />
//                   Patient Type Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
//                 </div>
//               </div>
//               <div className="h-80" ref={patientTypeChartRef}></div>
//             </div>

//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <MessageSquare size={18} className="mr-2 text-blue-900" />
//                   Comments Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
//                 </div>
//               </div>
//               <div className="h-72" ref={commentsChartRef}></div>
//             </div>
//           </div>

//           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                 <Calendar size={18} className="mr-2 text-blue-900" />
//                 Monthly Article Processing
//               </h3>
//             </div>
//             <div className="h-80" ref={timelineChartRef}></div>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes growWidth {
//           from { width: 0; }
//           to { width: 100%; }
//         }

//         .fadeIn {
//           opacity: 0;
//           animation: fadeIn 0.7s ease-out forwards;
//         }

//         .slideInUp {
//           opacity: 0;
//           animation: slideInUp 0.7s ease-out forwards;
//         }

//         .growWidth {
//           width: 0;
//           animation: growWidth 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import * as d3 from 'd3';
// import { select } from 'd3-selection';
// import { debounce } from 'lodash';
// import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';

// const Home = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     eMailCount: 0,
//     articleCount: 0,
//     icsrCount: 0,
//     aoiCount: 0
//   });
//   const [startMonth, setStartMonth] = useState(1);
//   const [endMonth, setEndMonth] = useState(12);
//   const [patientTypeData, setPatientTypeData] = useState([]);
//   const [casualityData, setCasualityData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isChartRendered, setIsChartRendered] = useState(false);
//   const [commentsData, setCommentsData] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [availableYears, setAvailableYears] = useState([]);
//   const [emailFilter, setEmailFilter] = useState(null);

//   // Refs for chart containers
//   const patientTypeChartRef = useRef(null);
//   const casualityChartRef = useRef(null);
//   const commentsChartRef = useRef(null);
//   const timelineChartRef = useRef(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: getLastSevenDaysStart(),
//     endDate: new Date().toISOString().split('T')[0]
//   });
  
//   // Function to get last 7 days (same as in CasesContent.js)
//   function getLastSevenDaysStart() {
//     const now = new Date();
//     const sevenDaysAgo = new Date(now);
//     sevenDaysAgo.setDate(now.getDate() - 6);
//     return sevenDaysAgo.toISOString().split('T')[0];
//   }
//   // Color constants
//   const PRIMARY_COLOR = '#14242c';
//   const COLOR_PALETTE = useMemo(() => [
//     '#14242c',
//     '#386790',
//     '#26455e',
//     '#2f5677',
//     '#386790',
//     '#4178a9'
//   ], []);
//   const ACCENT_COLOR = '#4178a9';
//   const LIGHT_BG = '#f8fafc';
//   const TEXT_COLOR = '#2c3e50';
//   const MUTED_TEXT = '#64748b';
//   const BORDER_COLOR = '#e2e8f0';

//   // Cache for raw data
//   const rawDataCache = useRef(null);

//   // Fetch and preprocess raw data once
//   const fetchRawData = useCallback(async () => {
//     if (rawDataCache.current) {
//       return rawDataCache.current;
//     }

//     try {
//       setLoading(true);
//       const data = await DatabaseService.fetchLiteratureReviews();

//       const processedData = data.map(item => {
//         const dateField = "Validation Processing Date";
//         let date, year, month, displayDate;
//         if (item[dateField]) {
//           const dateStr = item[dateField].toString();
//           if (dateStr) {
//             date = new Date(dateStr);
//             if (!isNaN(date.getTime())) {
//               year = date.getFullYear();
//               month = date.getMonth() + 1;
//               displayDate = date.toLocaleString('default', { month: 'short', year: 'numeric' });
//             }
//           }
//         }

//         const commentsField = "Comments (ICSR, AOI, Not selected)";
//         const comments = item[commentsField] ? item[commentsField].toString().toUpperCase() : 'Others';

//         const patientTypeField = Object.keys(item).find(key =>
//           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
//         );
//         const patientType = patientTypeField && item[patientTypeField] ? item[patientTypeField].toString().trim() : 'Unknown';

//         return {
//           date,
//           year,
//           month,
//           displayDate,
//           email: item.Mail,
//           comments,
//           patientType
//         };
//       }).filter(item => item.date && !isNaN(item.date.getTime()));

//       rawDataCache.current = processedData;
//       setLoading(false);
//       return processedData;
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setLoading(false);
//       return [];
//     }
//   }, []);

//   // Process data for charts based on filters
// // Process data for charts based on filters
// const processDashboardData = useCallback(async (year, start, end) => {
//   const rawData = await fetchRawData();

//   const uniqueEMails = new Set();
//   let icsrCount = 0;
//   let aoiCount = 0;
//   const patientTypeCounts = {};
//   const commentsCounts = { ICSR: 0, AOI: 0, Others: 0 };
//   const timelineDataByMonth = {};
//   const emailsByDate = {};
//   const allYears = new Set();

//   rawData.forEach(item => {
//     const { year: itemYear, month, email, comments, patientType, displayDate, date } = item;
//     allYears.add(itemYear);

//     if (itemYear === year && month >= start && month <= end) {
//       // Create a composite key for unique emails based on email and validation date
//       if (email && date) {
//         const emailDateKey = `${email}_${date.toISOString()}`;
//         uniqueEMails.add(emailDateKey);
//       }

//       const yearMonthKey = `${itemYear}-${month - 1}`;
//       if (!timelineDataByMonth[yearMonthKey]) {
//         timelineDataByMonth[yearMonthKey] = {
//           year: itemYear,
//           month,
//           count: 0,
//           displayDate,
//           emailCount: 0
//         };
//       }
//       timelineDataByMonth[yearMonthKey].count++;

//       if (!emailsByDate[yearMonthKey]) emailsByDate[yearMonthKey] = new Set();
//       if (email && date) {
//         const emailDateKey = `${email}_${date.toISOString()}`;
//         emailsByDate[yearMonthKey].add(emailDateKey);
//       }

//       if (comments.includes('ICSR')) {
//         icsrCount++;
//         commentsCounts.ICSR++;
//       } else if (comments.includes('AOI')) {
//         aoiCount++;
//         commentsCounts.AOI++;
//       } else {
//         commentsCounts.Others++;
//       }

//       if (patientType) {
//         patientTypeCounts[patientType] = (patientTypeCounts[patientType] || 0) + 1;
//       }
//     }
//   });

//   Object.keys(timelineDataByMonth).forEach(key => {
//     timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
//   });

//   const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
//     if (a.year !== b.year) return a.year - b.year;
//     return a.month - b.month;
//   });

//   setStats({
//     eMailCount: uniqueEMails.size,
//     articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
//     icsrCount,
//     aoiCount
//   });
//   setPatientTypeData(Object.entries(patientTypeCounts).map(([type, count]) => ({ type, count })));
//   setCommentsData(Object.entries(commentsCounts).map(([status, count]) => ({ status, count })));
//   setTimelineData(timelineArray);
//   setAvailableYears(Array.from(allYears).sort());
// }, [fetchRawData]);
//   // Debounced data processing with reduced delay
//   const debouncedProcessDashboardData = useMemo(
//     () => debounce(processDashboardData, 50),
//     [processDashboardData]
//   );

//   // Trigger data processing on filter change
//   useEffect(() => {
//     debouncedProcessDashboardData(selectedYear, startMonth, endMonth);
//     const timer = setTimeout(() => setIsChartRendered(true), 50);
//     return () => clearTimeout(timer);
//   }, [selectedYear, startMonth, endMonth, debouncedProcessDashboardData]);

//   // Render charts when data is ready
//   useEffect(() => {
//     if (!loading && isChartRendered) {
//       renderPatientTypeChart();
//       renderCommentsChart();
//       renderTimelineChart();
//       if (casualityData.length > 0) renderCasualityChart();
//     }
//   }, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData, emailFilter]);

//   // Timeline chart rendering
//   const renderTimelineChart = useCallback(() => {
//     if (!timelineChartRef.current) return;

//     const filteredData = timelineData.filter(d => d.year === selectedYear);
//     const monthRangeFilteredData = filteredData.filter(d => d.month >= startMonth && d.month <= endMonth);
//     const finalFilteredData = emailFilter !== null
//       ? monthRangeFilteredData.filter(d => d.emailCount >= emailFilter)
//       : monthRangeFilteredData;

//     if (finalFilteredData.length === 0) {
//       d3.select(timelineChartRef.current).selectAll("*").remove();
//       d3.select(timelineChartRef.current).append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     finalFilteredData.sort((a, b) => {
//       if (a.year !== b.year) return a.year - b.year;
//       return a.month - b.month;
//     });

//     d3.select(timelineChartRef.current).selectAll("*").remove();

//     const margin = { top: 30, right: 80, bottom: 60, left: 60 };
//     const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     const svg = d3.select(timelineChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scalePoint()
//       .domain(finalFilteredData.map(d => d.displayDate))
//       .range([0, width])
//       .padding(0.5);

//     const yArticles = d3.scaleLinear()
//       .domain([0, d3.max(finalFilteredData, d => d.count) * 1.2])
//       .range([height, 0]);

//     const yEmails = d3.scaleLinear()
//       .domain([0, d3.max(finalFilteredData, d => d.emailCount) * 1.2 || 10])
//       .range([height, 0]);

//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(yArticles)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll(".tick text")
//       .style("text-anchor", "end")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", "0.5em")
//       .attr("dx", "-0.asonic")
//       .attr("transform", "rotate(-45)");

//     svg.append("g")
//       .call(d3.axisLeft(yArticles)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", -margin.left + 15)
//       .attr("x", -height / 2)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Articles");

//     svg.append("g")
//       .attr("transform", `translate(${width}, 0)`)
//       .call(d3.axisRight(yEmails)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", width + margin.right - 15)
//       .attr("x", -height / 2)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", ACCENT_COLOR)
//       .text("Emails");

//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     const articleLine = d3.line()
//       .x(d => x(d.displayDate))
//       .y(d => yArticles(d.count))
//       .curve(d3.curveMonotoneX);

//     const emailLine = d3.line()
//       .x(d => x(d.displayDate))
//       .y(d => yEmails(d.emailCount))
//       .curve(d3.curveMonotoneX);

//     const defs = svg.append("defs");

//     const articleGradient = defs.append("linearGradient")
//       .attr("id", "article-line-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height);

//     articleGradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", PRIMARY_COLOR);

//     articleGradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     const emailGradient = defs.append("linearGradient")
//       .attr("id", "email-line-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height);

//     emailGradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR);

//     emailGradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 0.8);

//     const articlePath = svg.append("path")
//       .datum(finalFilteredData)
//       .attr("fill", "none")
//       .attr("stroke", "url(#article-line-gradient)")
//       .attr("stroke-width", 3)
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("d", articleLine)
//       .style("opacity", 0.8)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

//     const articlePathLength = articlePath.node().getTotalLength();
//     articlePath
//       .attr("stroke-dasharray", articlePathLength)
//       .attr("stroke-dashoffset", articlePathLength)
//       .transition()
//       .duration(1500)
//       .attr("stroke-dashoffset", 0);

//     const emailPath = svg.append("path")
//       .datum(finalFilteredData)
//       .attr("fill", "none")
//       .attr("stroke", "url(#email-line-gradient)")
//       .attr("stroke-width", 3)
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("stroke-dasharray", "5,5")
//       .attr("d", emailLine)
//       .style("opacity", 0.8);

//     const emailPathLength = emailPath.node().getTotalLength();
//     emailPath
//       .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
//       .attr("stroke-dashoffset", emailPathLength)
//       .transition()
//       .duration(1500)
//       .delay(300)
//       .attr("stroke-dasharray", "5,5")
//       .attr("stroke-dashoffset", 0);

//     svg.selectAll(".article-point")
//       .data(finalFilteredData)
//       .enter()
//       .append("circle")
//       .attr("class", "article-point")
//       .attr("cx", d => x(d.displayDate))
//       .attr("cy", d => yArticles(d.count))
//       .attr("r", 5)
//       .attr("fill", "#fff")
//       .attr("stroke", PRIMARY_COLOR)
//       .attr("stroke-width", 2)
//       .style("opacity", 0)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 7)
//           .attr("stroke-width", 3);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.displayDate}</div>
//             <div>Articles: ${d.count}</div>
//             <div>Emails: ${d.emailCount}</div>
//           </div>
//         `;

//         d3.select("#timeline-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 5)
//           .attr("stroke-width", 2);

//         d3.select("#timeline-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(300)
//       .delay((d, i) => 1500 + i * 50)
//       .style("opacity", 1);

//     svg.selectAll(".email-point")
//       .data(finalFilteredData)
//       .enter()
//       .append("circle")
//       .attr("class", "email-point")
//       .attr("cx", d => x(d.displayDate))
//       .attr("cy", d => yEmails(d.emailCount))
//       .attr("r", 4)
//       .attr("fill", "#fff")
//       .attr("stroke", ACCENT_COLOR)
//       .attr("stroke-width", 2)
//       .style("opacity", 0)
//       .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 6)
//           .attr("stroke-width", 3);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.displayDate}</div>
//             <div>Articles: ${d.count}</div>
//             <div>Emails: ${d.emailCount}</div>
//           </div>
//         `;

//         d3.select("#timeline-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("r", 4)
//           .attr("stroke-width", 2);

//         d3.select("#timeline-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(300)
//       .delay((d, i) => 1800 + i * 50)
//       .style("opacity", 1);

//     const legend = svg.append("g")
//       .attr("transform", `translate(${width - 120}, 10)`);

//     legend.append("line")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 20)
//       .attr("y2", 0)
//       .attr("stroke", PRIMARY_COLOR)
//       .attr("stroke-width", 3);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 4)
//       .text("Articles")
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR);

//     legend.append("line")
//       .attr("x1", 0)
//       .attr("y1", 20)
//       .attr("x2", 20)
//       .attr("y2", 20)
//       .attr("stroke", ACCENT_COLOR)
//       .attr("stroke-width", 3)
//       .attr("stroke-dasharray", "5,5");

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 24)
//       .text("Emails")
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR);

//     if (!document.getElementById("timeline-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "timeline-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [timelineData, selectedYear, startMonth, endMonth, emailFilter]);

//   // Patient type chart rendering
//   const renderPatientTypeChart = useCallback(() => {
//     if (!patientTypeChartRef.current) return;

//     d3.select(patientTypeChartRef.current).selectAll("*").remove();

//     if (patientTypeData.length === 0) {
//       d3.select(patientTypeChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
//     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     const svg = d3.select(patientTypeChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleBand()
//       .domain(patientTypeData.map(d => d.type))
//       .range([0, width])
//       .padding(0.4);

//     const y = d3.scaleLinear()
//       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
//       .range([height, 0]);

//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll(".tick text")
//       .style("text-anchor", "end")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", ".5em")
//       .attr("dx", "-.8em")
//       .attr("transform", "rotate(-25)");

//     svg.append("g")
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     const defs = svg.append("defs");

//     const gradient = defs.append("linearGradient")
//       .attr("id", "bar-gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "0%")
//       .attr("y2", "100%");

//     gradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 1);

//     gradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     defs.append("filter")
//       .attr("id", "shadow")
//       .append("feDropShadow")
//       .attr("dx", "0")
//       .attr("dy", "2")
//       .attr("stdDeviation", "2")
//       .attr("flood-opacity", "0.2");

//       svg.selectAll(".bar")
//       .data(patientTypeData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.type))
//       .attr("width", x.bandwidth())
//       .attr("y", height)
//       .attr("height", 0)
//       .attr("rx", 4)
//       .attr("fill", "url(#bar-gradient)")
//       .attr("filter", "url(#shadow)")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", ACCENT_COLOR);
    
//         const tooltip = d3.select("body").select(".tooltip");
//         tooltip
//           .style("opacity", 1)
//           .html(`<strong>${d.type}:</strong> ${d.count}`)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", "url(#bar-gradient)");
    
//         d3.select("body").select(".tooltip").style("opacity", 0);
//       })
//       .on("click", function(event, d) {
//         const queryParams = new URLSearchParams();
//         queryParams.set('patientType', encodeURIComponent(d.type));
//         queryParams.set('startMonth', startMonth);
//         queryParams.set('endMonth', endMonth);
//         queryParams.set('year', selectedYear);
//         navigate(`/cases?${queryParams.toString()}`);
//       })
//       .transition()
//       .duration(800)
//       .delay((d, i) => i * 100)
//       .attr("y", d => y(d.count))
//       .attr("height", d => height - y(d.count));

//     svg.selectAll(".value-label")
//       .data(patientTypeData)
//       .enter()
//       .append("text")
//       .attr("class", "value-label")
//       .attr("x", d => x(d.type) + x.bandwidth() / 2)
//       .attr("y", d => y(d.count) - 8)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .style("opacity", 0)
//       .text(d => d.count)
//       .transition()
//       .duration(800)
//       .delay((d, i) => 200 + i * 100)
//       .style("opacity", 1);

//     if (!d3.select("body").select(".tooltip").node()) {
//       d3.select("body")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("position", "absolute")
//         .style("padding", "8px")
//         .style("background", "white")
//         .style("border-radius", "4px")
//         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
//         .style("font-size", "12px")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [patientTypeData, startMonth, endMonth, selectedYear, navigate]);

//   // Comments chart rendering
//   const renderCommentsChart = useCallback(() => {
//     if (!commentsChartRef.current) return;

//     d3.select(commentsChartRef.current).selectAll("*").remove();

//     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
//       d3.select(commentsChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
//     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 370 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(commentsChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = commentsData.reduce((sum, d) => sum + d.count, 0);
//     commentsData.forEach(d => {
//       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
//     });

//     const commentsColors = {
//       ICSR: "#14242c",
//       AOI: "#4178a9",
//       Others: "#26455e"
//     };

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null)
//       .padAngle(0.03);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8)
//       .cornerRadius(4);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85)
//       .cornerRadius(4);

//     const path = svg.selectAll(".arc")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//       path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);
    
//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
//           </div>
//         `;
    
//         d3.select("#comments-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);
    
//         d3.select("#comments-tooltip").style("opacity", 0);
//       })
//       .on("click", function(event, d) {
//         if (d.data.status === "ICSR" || d.data.status === "AOI") {
//           const queryParams = new URLSearchParams();
//           queryParams.set('comments', encodeURIComponent(d.data.status));
//           queryParams.set('startMonth', startMonth);
//           queryParams.set('endMonth', endMonth);
//           queryParams.set('year', selectedYear);
//           navigate(`/cases?${queryParams.toString()}`);
//         }
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     const arcLabels = svg.selectAll(".arc-label")
//       .data(pie(commentsData))
//       .enter()
//       .append("text")
//       .attr("class", "arc-label")
//       .attr("transform", d => {
//         const centroid = arc.centroid(d);
//         const x = centroid[0] * 1.0;
//         const y = centroid[1] * 1.0;
//         return `translate(${x}, ${y})`;
//       })
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "11px")
//       .style("font-weight", "bold")
//       .style("fill", "#fff")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => d.data.count)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

//     commentsData.forEach((d, i) => {
//       if (d.status === "ICSR" && d.percentage < 3) {
//         const pieData = pie(commentsData)[i];
//         const centroid = arc.centroid(pieData);
//         const x = centroid[0] * 1.5;
//         const y = centroid[1] * 1.5;

//         svg.append("line")
//           .attr("x1", centroid[0])
//           .attr("y1", centroid[1])
//           .attr("x2", x)
//           .attr("y2", y)
//           .attr("stroke", "#14242c")
//           .attr("stroke-width", 1.5)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1000)
//           .duration(500)
//           .attr("opacity", 1);

//         svg.append("text")
//           .attr("x", x + 10)
//           .attr("y", y)
//           .attr("text-anchor", "start")
//           .attr("alignment-baseline", "middle")
//           .style("font-size", "12px")
//           .style("font-weight", "bold")
//           .style("fill", "#14242c")
//           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1100)
//           .duration(500)
//           .attr("opacity", 1);
//       }
//     });

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Comments");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Distribution");

//     const legend = svg.selectAll(".legend")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => `${d.data.status}: ${d.data.count}`)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("comments-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "comments-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [commentsData, startMonth, endMonth, selectedYear, navigate]);

//   // Casuality chart rendering
//   const renderCasualityChart = useCallback(() => {
//     if (!casualityChartRef.current || casualityData.length === 0) return;

//     d3.select(casualityChartRef.current).selectAll("*").remove();

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(casualityChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
//     casualityData.forEach(d => {
//       d.percentage = (d.count / total) * 100;
//     });

//     const color = d3.scaleOrdinal()
//       .domain(casualityData.map(d => d.status))
//       .range(COLOR_PALETTE);

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85);

//     const labelArc = d3.arc()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9);

//     const path = svg.selectAll(".arc")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.status))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
//           </div>
//         `;

//         d3.select("#casuality-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);

//         d3.select("#casuality-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     svg.selectAll(".percentage-label")
//       .data(pie(casualityData))
//       .enter()
//       .append("text")
//       .attr("class", "percentage-label")
//       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", "#000")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => `${Math.round(d.data.percentage)}%`)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", 1);

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Casuality");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Validation");

//     const legend = svg.selectAll(".legend")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => color(d.data.status))
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => d.data.status)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("casuality-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "casuality-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [casualityData]);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

//   const handleCardClick = route => navigate(route);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
//       <div className="fadeIn mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
//         <div className="flex items-center mt-2">
//           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
//           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
//         </div>
//       </div>

//       <div className="fadeIn mb-8 bg-white rounded-lg shadow-sm p-4">
//         <div className="flex flex-wrap gap-2 items-center">
//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//           >
//             {availableYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={startMonth}
//             onChange={(e) => setStartMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={endMonth}
//             onChange={(e) => setEndMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <button
//             className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
//             onClick={() => {
//               setSelectedYear(new Date().getFullYear());
//               setStartMonth(1);
//               setEndMonth(12);
//               setSelectedMonth(null);
//               setEmailFilter(null);
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
//             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div
//   className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//   style={{ animationDelay: '100ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//   onClick={() => {
//     const queryParams = new URLSearchParams();
//     queryParams.set('year', selectedYear);
//     queryParams.set('startMonth', startMonth);
//     queryParams.set('endMonth', endMonth);
//     queryParams.set('filterType', 'uniqueEmailsWithDate');
//     navigate(`/literature-review?${queryParams.toString()}`);
//   }}
// >
//   <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//   <div className="relative z-10 flex items-start">
//     <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//       <Mail size={20} className="text-white" />
//     </div>
//     <div className="flex-grow">
//       <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
//       <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
//       <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
//     </div>
//     <ChevronRight size={18} className="text-blue-900 self-center" />
//   </div>
// </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '200ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/cases')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <FileText size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '300ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/medical-review')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <AlertCircle size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
//                   <div className="flex items-center space-x-2">
//                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
//                       Total: {stats.icsrCount + stats.aoiCount}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <Users size={18} className="mr-2 text-blue-900" />
//                   Patient Type Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
//                 </div>
//               </div>
//               <div className="h-80" ref={patientTypeChartRef}></div>
//             </div>

//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <MessageSquare size={18} className="mr-2 text-blue-900" />
//                   Comments Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
//                 </div>
//               </div>
//               <div className="h-72" ref={commentsChartRef}></div>
//             </div>
//           </div>

//           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                 <Calendar size={18} className="mr-2 text-blue-900" />
//                 Monthly Article Processing
//               </h3>
//             </div>
//             <div className="h-80" ref={timelineChartRef}></div>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes growWidth {
//           from { width: 0; }
//           to { width: 100%; }
//         }

//         .fadeIn {
//           opacity: 0;
//           animation: fadeIn 0.7s ease-out forwards;
//         }

//         .slideInUp {
//           opacity: 0;
//           animation: slideInUp 0.7s ease-out forwards;
//         }

//         .growWidth {
//           width: 0;
//           animation: growWidth 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import * as d3 from 'd3';
// import { debounce } from 'lodash';
// import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';

// const Home = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     eMailCount: 0,
//     articleCount: 0,
//     icsrCount: 0,
//     aoiCount: 0
//   });
//   const [startMonth, setStartMonth] = useState(1);
//   const [endMonth, setEndMonth] = useState(12);
//   const [patientTypeData, setPatientTypeData] = useState([]);
//   const [casualityData, setCasualityData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isChartRendered, setIsChartRendered] = useState(false);
//   const [commentsData, setCommentsData] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [availableYears, setAvailableYears] = useState([]);
//   const [emailFilter, setEmailFilter] = useState(null);
//   const patientTypeChartRef = useRef(null);
//   const casualityChartRef = useRef(null);
//   const commentsChartRef = useRef(null);
//   const timelineChartRef = useRef(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: getLastSevenDaysStart(),
//     endDate: new Date().toISOString().split('T')[0]
//   });

//   // Color constants from the first snippet
//   const PRIMARY_COLOR = '#14242c';
//   const COLOR_PALETTE = useMemo(() => [
//     '#14242c',
//     '#386790',
//     '#26455e',
//     '#2f5677',
//     '#386790',
//     '#4178a9'
//   ], []);
//   const ACCENT_COLOR = '#4178a9';
//   const LIGHT_BG = '#f8fafc';
//   const TEXT_COLOR = '#2c3e50';
//   const MUTED_TEXT = '#64748b';
//   const BORDER_COLOR = '#e2e8f0';

//   const rawDataCache = useRef(null);

//   function getLastSevenDaysStart() {
//     const now = new Date();
//     const sevenDaysAgo = new Date(now);
//     sevenDaysAgo.setDate(now.getDate() - 6);
//     return sevenDaysAgo.toISOString().split('T')[0];
//   }

//   // Fetch raw data (from second snippet)
//   const fetchRawData = useCallback(async () => {
//     if (rawDataCache.current) {
//       return rawDataCache.current;
//     }
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await DatabaseService.fetchDashboardData();
//       console.log('Raw dashboard data:', data);
//       const processedData = data.map(item => {
//         const dateField = "Validation Processing Date";
//         let date, year, month, displayDate;
//         if (item[dateField]) {
//           const dateStr = item[dateField].toString();
//           if (dateStr) {
//             date = new Date(dateStr);
//             if (!isNaN(date.getTime())) {
//               year = date.getFullYear();
//               month = date.getMonth() + 1;
//               displayDate = date.toLocaleString('default', { month: 'short', year: 'numeric' });
//             }
//           }
//         }
//         const commentsField = "Comments (ICSR, AOI, Not selected)";
//         const comments = item[commentsField] ? item[commentsField].toString().toUpperCase() : 'Others';
//         const patientTypeField = Object.keys(item).find(key =>
//           key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
//         );
//         const patientType = patientTypeField && item[patientTypeField] ? item[patientTypeField].toString().trim() : 'Unknown';
//         return { date, year, month, displayDate, email: item.Mail, comments, patientType };
//       }).filter(item => item.date && !isNaN(item.date.getTime()));
//       rawDataCache.current = processedData;
//       setLoading(false);
//       return processedData;
//     } catch (err) {
//       console.error('Error fetching dashboard data:', {
//         message: err.message,
//         status: err.response?.status,
//         data: err.response?.data
//       });
//       setError(err.response?.data?.error || 'Failed to load dashboard data');
//       setLoading(false);
//       return [];
//     }
//   }, []);

//   // Process data for charts (from second snippet)
//   const processDashboardData = useCallback(async (year, start, end) => {
//     const rawData = await fetchRawData();
//     if (!rawData || rawData.length === 0) {
//       setStats({ eMailCount: 0, articleCount: 0, icsrCount: 0, aoiCount: 0 });
//       setPatientTypeData([]);
//       setCommentsData([]);
//       setTimelineData([]);
//       setAvailableYears([new Date().getFullYear()]);
//       return;
//     }
//     const uniqueEMails = new Set();
//     let icsrCount = 0;
//     let aoiCount = 0;
//     const patientTypeCounts = {};
//     const commentsCounts = { ICSR: 0, AOI: 0, Others: 0 };
//     const timelineDataByMonth = {};
//     const emailsByDate = {};
//     const allYears = new Set();

//     rawData.forEach(item => {
//       const { year: itemYear, month, email, comments, patientType, displayDate, date } = item;
//       allYears.add(itemYear);

//       if (itemYear === year && month >= start && month <= end) {
//         if (email && date) {
//           const emailDateKey = `${email}_${date.toISOString()}`;
//           uniqueEMails.add(emailDateKey);
//         }

//         const yearMonthKey = `${itemYear}-${month.toString().padStart(2, '0')}`;
//         if (!timelineDataByMonth[yearMonthKey]) {
//           timelineDataByMonth[yearMonthKey] = {
//             year: itemYear,
//             month,
//             count: 0,
//             displayDate,
//             emailCount: 0
//           };
//         }
//         timelineDataByMonth[yearMonthKey].count++;

//         if (!emailsByDate[yearMonthKey]) emailsByDate[yearMonthKey] = new Set();
//         if (email && date) {
//           const emailDateKey = `${email}_${date.toISOString()}`;
//           emailsByDate[yearMonthKey].add(emailDateKey);
//         }

//         if (comments.includes('ICSR')) {
//           icsrCount++;
//           commentsCounts.ICSR++;
//         } else if (comments.includes('AOI')) {
//           aoiCount++;
//           commentsCounts.AOI++;
//         } else {
//           commentsCounts.Others++;
//         }

//         if (patientType) {
//           patientTypeCounts[patientType] = (patientTypeCounts[patientType] || 0) + 1;
//         }
//       }
//     });

//     Object.keys(timelineDataByMonth).forEach(key => {
//       timelineDataByMonth[key].emailCount = emailsByDate[key] ? emailsByDate[key].size : 0;
//     });

//     const timelineArray = Object.values(timelineDataByMonth).sort((a, b) => {
//       if (a.year !== b.year) return a.year - b.year;
//       return a.month - b.month;
//     });

//     setStats({
//       eMailCount: uniqueEMails.size,
//       articleCount: timelineArray.reduce((sum, d) => sum + d.count, 0),
//       icsrCount,
//       aoiCount
//     });
//     setPatientTypeData(Object.entries(patientTypeCounts).map(([type, count]) => ({ type, count })));
//     setCommentsData(Object.entries(commentsCounts).map(([item, count]) => ({ status: item, count })));
//     setTimelineData(timelineArray);
//     setAvailableYears(Array.from(allYears).sort());
//   }, [fetchRawData]);

//   // Debounced data processing
//   const debouncedProcessDashboardData = useMemo(
//     () => debounce(processDashboardData, 50),
//     [processDashboardData]
//   );

//   // Trigger data processing on filter change
//   useEffect(() => {
//     debouncedProcessDashboardData(selectedYear, startMonth, endMonth);
//     const timer = setTimeout(() => setIsChartRendered(true), 50);
//     return () => clearTimeout(timer);
//   }, [selectedYear, startMonth, endMonth, debouncedProcessDashboardData]);

//   // Render charts when data is ready
//   useEffect(() => {
//     if (!loading && isChartRendered) {
//       renderPatientTypeChart();
//       renderCommentsChart();
//       renderTimelineChart();
//       if (casualityData.length > 0) renderCasualityChart();
//     }
//   }, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData, emailFilter]);

//   // Patient type chart rendering (from first snippet)
//   const renderPatientTypeChart = useCallback(() => {
//     if (!patientTypeChartRef.current) return;

//     d3.select(patientTypeChartRef.current).selectAll("*").remove();

//     if (patientTypeData.length === 0) {
//       d3.select(patientTypeChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 30, right: 30, bottom: 60, left: 50 };
//     const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;

//     const svg = d3.select(patientTypeChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleBand()
//       .domain(patientTypeData.map(d => d.type))
//       .range([0, width])
//       .padding(0.4);

//     const y = d3.scaleLinear()
//       .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
//       .range([height, 0]);

//     svg.append("g")
//       .attr("class", "grid")
//       .attr("opacity", 0.1)
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat(""))
//       .select(".domain")
//       .remove();

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll(".tick text")
//       .style("text-anchor", "end")
//       .style("font-size", "12px")
//       .style("font-weight", "400")
//       .style("fill", TEXT_COLOR)
//       .attr("dy", ".5em")
//       .attr("dx", "-.8em")
//       .attr("transform", "rotate(-25)");

//     svg.append("g")
//       .call(d3.axisLeft(y)
//         .ticks(5)
//         .tickFormat(d => d)
//         .tickSize(0))
//       .select(".domain")
//       .attr("stroke", BORDER_COLOR);

//     svg.selectAll("g.tick text")
//       .style("font-size", "12px")
//       .style("fill", MUTED_TEXT);

//     const defs = svg.append("defs");

//     const gradient = defs.append("linearGradient")
//       .attr("id", "bar-gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "0%")
//       .attr("y2", "100%");

//     gradient.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", ACCENT_COLOR)
//       .attr("stop-opacity", 1);

//     gradient.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", PRIMARY_COLOR)
//       .attr("stop-opacity", 0.8);

//     defs.append("filter")
//       .attr("id", "shadow")
//       .append("feDropShadow")
//       .attr("dx", "0")
//       .attr("dy", "2")
//       .attr("stdDeviation", "2")
//       .attr("flood-opacity", "0.2");

//     svg.selectAll(".bar")
//       .data(patientTypeData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.type))
//       .attr("width", x.bandwidth())
//       .attr("y", height)
//       .attr("height", 0)
//       .attr("rx", 4)
//       .attr("fill", "url(#bar-gradient)")
//       .attr("filter", "url(#shadow)")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", ACCENT_COLOR);

//         const tooltip = d3.select("body").select(".tooltip");
//         tooltip
//           .style("opacity", 1)
//           .html(`<strong>${d.type}:</strong> ${d.count}`)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("fill", "url(#bar-gradient)");

//         d3.select("body").select(".tooltip").style("opacity", 0);
//       })
//       .on("click", function(event, d) {
//         const queryParams = new URLSearchParams();
//         queryParams.set('patientType', encodeURIComponent(d.type));
//         queryParams.set('startMonth', startMonth);
//         queryParams.set('endMonth', endMonth);
//         queryParams.set('year', selectedYear);
//         navigate(`/cases?${queryParams.toString()}`);
//       })
//       .transition()
//       .duration(800)
//       .delay((d, i) => i * 100)
//       .attr("y", d => y(d.count))
//       .attr("height", d => height - y(d.count));

//     svg.selectAll(".value-label")
//       .data(patientTypeData)
//       .enter()
//       .append("text")
//       .attr("class", "value-label")
//       .attr("x", d => x(d.type) + x.bandwidth() / 2)
//       .attr("y", d => y(d.count) - 8)
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .style("opacity", 0)
//       .text(d => d.count)
//       .transition()
//       .duration(800)
//       .delay((d, i) => 200 + i * 100)
//       .style("opacity", 1);

//     if (!d3.select("body").select(".tooltip").node()) {
//       d3.select("body")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("position", "absolute")
//         .style("padding", "8px")
//         .style("background", "white")
//         .style("border-radius", "4px")
//         .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
//         .style("font-size", "12px")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [patientTypeData, startMonth, endMonth, selectedYear, navigate]);

//   // Comments chart rendering (from first snippet)
//   const renderCommentsChart = useCallback(() => {
//     if (!commentsChartRef.current) return;

//     d3.select(commentsChartRef.current).selectAll("*").remove();

//     if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
//       d3.select(commentsChartRef.current)
//         .append("div")
//         .attr("class", "flex justify-center items-center h-full")
//         .append("p")
//         .attr("class", "text-gray-500")
//         .text("No data available for the selected filters");
//       return;
//     }

//     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
//     const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 370 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(commentsChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = commentsData.reduce((sum, d) => sum + d.count, 0);
//     commentsData.forEach(d => {
//       d.percentage = total > 0 ? (d.count / total) * 100 : 0;
//     });

//     const commentsColors = {
//       ICSR: "#14242c",
//       AOI: "#4178a9",
//       Others: "#26455e"
//     };

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null)
//       .padAngle(0.03);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8)
//       .cornerRadius(4);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85)
//       .cornerRadius(4);

//     const path = svg.selectAll(".arc")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
//           </div>
//         `;

//         d3.select("#comments-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);

//         d3.select("#comments-tooltip").style("opacity", 0);
//       })
//       .on("click", function(event, d) {
//         if (d.data.status === "ICSR" || d.data.status === "AOI") {
//           const queryParams = new URLSearchParams();
//           queryParams.set('comments', encodeURIComponent(d.data.status));
//           queryParams.set('startMonth', startMonth);
//           queryParams.set('endMonth', endMonth);
//           queryParams.set('year', selectedYear);
//           navigate(`/cases?${queryParams.toString()}`);
//         }
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     const arcLabels = svg.selectAll(".arc-label")
//       .data(pie(commentsData))
//       .enter()
//       .append("text")
//       .attr("class", "arc-label")
//       .attr("transform", d => {
//         const centroid = arc.centroid(d);
//         const x = centroid[0] * 1.0;
//         const y = centroid[1] * 1.0;
//         return `translate(${x}, ${y})`;
//       })
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "11px")
//       .style("font-weight", "bold")
//       .style("fill", "#fff")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => d.data.count)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

//     commentsData.forEach((d, i) => {
//       if (d.status === "ICSR" && d.percentage < 3) {
//         const pieData = pie(commentsData)[i];
//         const centroid = arc.centroid(pieData);
//         const x = centroid[0] * 1.5;
//         const y = centroid[1] * 1.5;

//         svg.append("line")
//           .attr("x1", centroid[0])
//           .attr("y1", centroid[1])
//           .attr("x2", x)
//           .attr("y2", y)
//           .attr("stroke", "#14242c")
//           .attr("stroke-width", 1.5)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1000)
//           .duration(500)
//           .attr("opacity", 1);

//         svg.append("text")
//           .attr("x", x + 10)
//           .attr("y", y)
//           .attr("text-anchor", "start")
//           .attr("alignment-baseline", "middle")
//           .style("font-size", "12px")
//           .style("font-weight", "bold")
//           .style("fill", "#14242c")
//           .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
//           .attr("opacity", 0)
//           .transition()
//           .delay(1100)
//           .duration(500)
//           .attr("opacity", 1);
//       }
//     });

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Comments");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Distribution");

//     const legend = svg.selectAll(".legend")
//       .data(pie(commentsData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => commentsColors[d.data.status] || "#386790")
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => `${d.data.status}: ${d.data.count}`)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("comments-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "comments-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [commentsData, startMonth, endMonth, selectedYear, navigate]);

//   // Timeline chart rendering (from first snippet)
// const renderTimelineChart = useCallback(() => {
//   if (!timelineChartRef.current) return;

//   const filteredData = timelineData.filter((d) => d.year === selectedYear);
//   const monthRangeFilteredData = filteredData.filter(
//     (d) => d.month >= startMonth && d.month <= endMonth
//   );
//   const finalFilteredData = emailFilter !== null
//     ? monthRangeFilteredData.filter((d) => d.emailCount >= emailFilter)
//     : monthRangeFilteredData;

//   if (finalFilteredData.length === 0) {
//     d3.select(timelineChartRef.current).selectAll("*").remove();
//     d3.select(timelineChartRef.current)
//       .append("div")
//       .attr("class", "flex items-center justify-center h-full")
//       .append("p")
//       .attr("class", "text-gray-500")
//       .text("No data available for the selected filters");
//     return;
//   }

//   finalFilteredData.sort((a, b) => {
//     if (a.year !== b.year) return a.year - b.year;
//     return a.month - b.month;
//   });

//   d3.select(timelineChartRef.current).selectAll("*").remove();

//   const margin = { top: 30, right: 80, bottom: 60, left: 60 };
//   const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
//   const height = 350 - margin.top - margin.bottom;

//   const svg = d3
//     .select(timelineChartRef.current)
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   const x = d3
//     .scalePoint()
//     .domain(finalFilteredData.map((d) => d.displayDate))
//     .range([0, width])
//     .padding(0.5);

//   const yArticles = d3
//     .scaleLinear()
//     .domain([0, d3.max(finalFilteredData, (d) => d.count) * 1.2])
//     .range([height, 0]);

//   const yEmails = d3
//     .scaleLinear()
//     .domain([0, d3.max(finalFilteredData, (d) => d.emailCount) * 1.2 || 10])
//     .range([height, 0]);

//   svg
//     .append("g")
//     .attr("class", "grid")
//     .attr("opacity", 0.1)
//     .call(
//       d3
//         .axisLeft(yArticles)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat("")
//     )
//     .select(".domain")
//     .remove();

//   svg
//     .append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x).tickSize(0))
//     .select(".domain")
//     .attr("stroke", BORDER_COLOR);

//   svg
//     .selectAll(".tick text")
//     .style("text-anchor", "end")
//     .style("font-size", "12px")
//     .style("font-weight", "400")
//     .style("fill", TEXT_COLOR)
//     .attr("dy", "0.5em")
//     .attr("dx", "-0.8em")
//     .attr("transform", "rotate(-45)");

//   svg
//     .append("g")
//     .call(
//       d3
//         .axisLeft(yArticles)
//         .ticks(5)
//         .tickFormat((d) => d)
//         .tickSize(0)
//     )
//     .select(".domain")
//     .attr("stroke", BORDER_COLOR);

//   svg
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -margin.left + 15)
//     .attr("x", -height / 2)
//     .attr("text-anchor", "middle")
//     .style("font-size", "12px")
//     .style("font-weight", "bold")
//     .style("fill", PRIMARY_COLOR)
//     .text("Articles");

//   svg
//     .append("g")
//     .attr("transform", `translate(${width}, 0)`)
//     .call(
//       d3
//         .axisRight(yEmails)
//         .ticks(5)
//         .tickFormat((d) => d)
//         .tickSize(0)
//     )
//     .select(".domain")
//     .attr("stroke", BORDER_COLOR);

//   svg
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", width + margin.right - 15)
//     .attr("x", -height / 2)
//     .attr("text-anchor", "middle")
//     .style("font-size", "12px")
//     .style("font-weight", "bold")
//     .style("fill", ACCENT_COLOR)
//     .text("Emails");

//   svg
//     .selectAll("g.tick text")
//     .style("font-size", "12px")
//     .style("fill", MUTED_TEXT);

//   const articleLine = d3
//     .line()
//     .x((d) => x(d.displayDate))
//     .y((d) => yArticles(d.count))
//     .curve(d3.curveMonotoneX);

//   const emailLine = d3
//     .line()
//     .x((d) => x(d.displayDate))
//     .y((d) => yEmails(d.emailCount))
//     .curve(d3.curveMonotoneX);

//   const defs = svg.append("defs");

//   const articleGradient = defs
//     .append("linearGradient")
//     .attr("id", "article-line-gradient")
//     .attr("gradientUnits", "userSpaceOnUse")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 0)
//     .attr("y2", height);

//   articleGradient
//     .append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", PRIMARY_COLOR);

//   articleGradient
//     .append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", PRIMARY_COLOR)
//     .attr("stop-opacity", 0.8);

//   const emailGradient = defs
//     .append("linearGradient")
//     .attr("id", "email-line-gradient")
//     .attr("gradientUnits", "userSpaceOnUse")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 0)
//     .attr("y2", height);

//   emailGradient
//     .append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", ACCENT_COLOR);

//   emailGradient
//     .append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", ACCENT_COLOR)
//     .attr("stop-opacity", 0.8);

//   const articlePath = svg
//     .append("path")
//     .datum(finalFilteredData)
//     .attr("fill", "none")
//     .attr("stroke", "url(#article-line-gradient)")
//     .attr("stroke-width", 3)
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("d", articleLine)
//     .style("opacity", 0.8)
//     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))");

//   const articlePathLength = articlePath.node().getTotalLength();
//   articlePath
//     .attr("stroke-dasharray", articlePathLength)
//     .attr("stroke-dashoffset", articlePathLength)
//     .transition()
//     .duration(1500)
//     .attr("stroke-dashoffset", 0);

//   const emailPath = svg
//     .append("path")
//     .datum(finalFilteredData)
//     .attr("fill", "none")
//     .attr("stroke", "url(#email-line-gradient)")
//     .attr("stroke-width", 3)
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("stroke-dasharray", "5,5")
//     .attr("d", emailLine)
//     .style("opacity", 0.8);

//   const emailPathLength = emailPath.node().getTotalLength();
//   emailPath
//     .attr("stroke-dasharray", `5, 5, ${emailPathLength}`)
//     .attr("stroke-dashoffset", emailPathLength)
//     .transition()
//     .duration(1500)
//     .delay(300)
//     .attr("stroke-dasharray", "5,5")
//     .attr("stroke-dashoffset", 0);

//   svg
//     .selectAll(".article-point")
//     .data(finalFilteredData)
//     .enter()
//     .append("circle")
//     .attr("class", "article-point")
//     .attr("cx", (d) => x(d.displayDate))
//     .attr("cy", (d) => yArticles(d.count))
//     .attr("r", 5)
//     .attr("fill", "#fff")
//     .attr("stroke", PRIMARY_COLOR)
//     .attr("stroke-width", 2)
//     .style("opacity", 0)
//     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//     .on("mouseover", function (event, d) {
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr("r", 7)
//         .attr("stroke-width", 3);

//       const tooltipContent = `
//         <div class="p-2">
//           <div class="font-bold">${d.displayDate}</div>
//           <div>Articles: ${d.count}</div>
//           <div>Emails: ${d.emailCount}</div>
//         </div>
//       `;

//       d3.select("#timeline-tooltip")
//         .style("opacity", 1)
//         .style("left", `${event.pageX + 10}px`)
//         .style("top", `${event.pageY - 28}px`)
//         .html(tooltipContent);
//     })
//     .on("mouseout", function () {
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr("r", 5)
//         .attr("stroke-width", 2);

//       d3.select("#timeline-tooltip").style("opacity", 0);
//     })
//     .transition()
//     .duration(300)
//     .delay((d, i) => 1500 + i * 50)
//     .style("opacity", 1);

//   svg
//     .selectAll(".email-point")
//     .data(finalFilteredData)
//     .enter()
//     .append("circle")
//     .attr("class", "email-point")
//     .attr("cx", (d) => x(d.displayDate))
//     .attr("cy", (d) => yEmails(d.emailCount))
//     .attr("r", 4)
//     .attr("fill", "#fff")
//     .attr("stroke", ACCENT_COLOR)
//     .attr("stroke-width", 2)
//     .style("opacity", 0)
//     .style("filter", "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))")
//     .on("mouseover", function (event, d) {
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr("r", 6)
//         .attr("stroke-width", 3);

//       const tooltipContent = `
//         <div class="p-2">
//           <div class="font-bold">${d.displayDate}</div>
//           <div>Articles: ${d.count}</div>
//           <div>Emails: ${d.emailCount}</div>
//         </div>
//       `;

//       d3.select("#timeline-tooltip")
//         .style("opacity", 1)
//         .style("left", `${event.pageX + 10}px`)
//         .style("top", `${event.pageY - 28}px`)
//         .html(tooltipContent);
//     })
//     .on("mouseout", function () {
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr("r", 4)
//         .attr("stroke-width", 2);

//       d3.select("#timeline-tooltip").style("opacity", 0);
//     })
//     .transition()
//     .duration(300)
//     .delay((d, i) => 1800 + i * 50)
//     .style("opacity", 1);

//   const legend = svg
//     .append("g")
//     .attr("transform", `translate(${width - 120}, 10)`);

//   legend
//     .append("line")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 20)
//     .attr("y2", 0)
//     .attr("stroke", PRIMARY_COLOR)
//     .attr("stroke-width", 3);

//   legend
//     .append("text")
//     .attr("x", 25)
//     .attr("y", 4)
//     .text("Articles")
//     .style("font-size", "12px")
//     .style("font-weight", "medium")
//     .style("fill", TEXT_COLOR);

//   legend
//     .append("line")
//     .attr("x1", 0)
//     .attr("y1", 20)
//     .attr("x2", 20)
//     .attr("y2", 20)
//     .attr("stroke", ACCENT_COLOR)
//     .attr("stroke-width", 3)
//     .attr("stroke-dasharray", "5,5");

//   legend
//     .append("text")
//     .attr("x", 25)
//     .attr("y", 24)
//     .text("Emails")
//     .style("font-size", "12px")
//     .style("font-weight", "medium")
//     .style("fill", TEXT_COLOR);

//   if (!document.getElementById("timeline-tooltip")) {
//     d3.select("body")
//       .append("div")
//       .attr("id", "timeline-tooltip")
//       .style("position", "absolute")
//       .style("background", "white")
//       .style("padding", "5px")
//       .style("border-radius", "5px")
//       .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .style("z-index", 10);
//   }
// }, [timelineData, selectedYear, startMonth, endMonth, emailFilter]);

//   // Casuality chart rendering (from first snippet)
//   const renderCasualityChart = useCallback(() => {
//     if (!casualityChartRef.current || casualityData.length === 0) return;

//     d3.select(casualityChartRef.current).selectAll("*").remove();

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
//     const height = 350 - margin.top - margin.bottom;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(casualityChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

//     const total = casualityData.reduce((sum, d) => sum + d.count, 0);
//     casualityData.forEach(d => {
//       d.percentage = (d.count / total) * 100;
//     });

//     const color = d3.scaleOrdinal()
//       .domain(casualityData.map(d => d.status))
//       .range(COLOR_PALETTE);

//     const pie = d3.pie()
//       .value(d => d.count)
//       .sort(null);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.8);

//     const hoverArc = d3.arc()
//       .innerRadius(radius * 0.5)
//       .outerRadius(radius * 0.85);

//     const labelArc = d3.arc()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9);

//     const path = svg.selectAll(".arc")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     path.append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.status))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .style("opacity", 0.9)
//       .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
//       .on("mouseover", function(event, d) {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", hoverArc)
//           .style("opacity", 1);

//         const tooltipContent = `
//           <div class="p-2">
//             <div class="font-bold">${d.data.status}</div>
//             <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
//           </div>
//         `;

//         d3.select("#casuality-tooltip")
//           .style("opacity", 1)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 28}px`)
//           .html(tooltipContent);
//       })
//       .on("mouseout", function() {
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr("d", arc)
//           .style("opacity", 0.9);

//         d3.select("#casuality-tooltip").style("opacity", 0);
//       })
//       .transition()
//       .duration(1000)
//       .attrTween("d", function(d) {
//         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//         return function(t) {
//           return arc(interpolate(t));
//         };
//       });

//     svg.selectAll(".percentage-label")
//       .data(pie(casualityData))
//       .enter()
//       .append("text")
//       .attr("class", "percentage-label")
//       .attr("transform", d => `translate(${labelArc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .style("font-size", "12px")
//       .style("font-weight", "bold")
//       .style("fill", "#000")
//       .style("pointer-events", "none")
//       .style("opacity", 0)
//       .text(d => `${Math.round(d.data.percentage)}%`)
//       .transition()
//       .delay(1000)
//       .duration(500)
//       .style("opacity", 1);

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.5em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Casuality");

//     svg.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1em")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .style("fill", PRIMARY_COLOR)
//       .text("Validation");

//     const legend = svg.selectAll(".legend")
//       .data(pie(casualityData))
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

//     legend.append("rect")
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("fill", d => color(d.data.status))
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1000 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     legend.append("text")
//       .attr("x", 25)
//       .attr("y", 12)
//       .text(d => d.data.status)
//       .style("font-size", "12px")
//       .style("font-weight", "medium")
//       .style("fill", TEXT_COLOR)
//       .style("opacity", 0)
//       .transition()
//       .delay((d, i) => 1100 + i * 100)
//       .duration(500)
//       .style("opacity", 1);

//     if (!document.getElementById("casuality-tooltip")) {
//       d3.select("body")
//         .append("div")
//         .attr("id", "casuality-tooltip")
//         .style("position", "absolute")
//         .style("background", "white")
//         .style("padding", "5px")
//         .style("border-radius", "5px")
//         .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
//         .style("pointer-events", "none")
//         .style("opacity", 0)
//         .style("z-index", 10);
//     }
//   }, [casualityData]);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

//   const handleCardClick = route => navigate(route);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8">
//       <div className="fadeIn mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
//         <div className="flex items-center mt-2">
//           <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
//           <p className="text-gray-600">DeepForrest Literature Assistant | {currentDate}</p>
//         </div>
//       </div>

//       <div className="fadeIn mb-8 bg-white rounded-lg shadow-sm p-4">
//         <div className="flex flex-wrap gap-2 items-center">
//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//           >
//             {availableYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={startMonth}
//             onChange={(e) => setStartMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <select
//             className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
//             value={endMonth}
//             onChange={(e) => setEndMonth(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
//               <option key={month} value={month}>
//                 To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>

//           <button
//             className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
//             onClick={() => {
//               setSelectedYear(new Date().getFullYear());
//               setStartMonth(1);
//               setEndMonth(12);
//               setSelectedMonth(null);
//               setEmailFilter(null);
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
//             <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="text-red-600 text-center p-4 bg-white rounded-lg shadow-sm">
//           {error}
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '100ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => {
//                 const queryParams = new URLSearchParams();
//                 queryParams.set('year', selectedYear);
//                 queryParams.set('startMonth', startMonth);
//                 queryParams.set('endMonth', endMonth);
//                 queryParams.set('filterType', 'uniqueEmailsWithDate');
//                 const route = localStorage.getItem('roleId') === '2' ? '/medical-review' : '/literature-review';
//                 navigate(`${route}?${queryParams.toString()}`);
//               }}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <Mail size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">Emails</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.eMailCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '200ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/cases')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <FileText size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">All Articles</h3>
//                   <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.articleCount)}</p>
//                   <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>

//             <div
//               className="slideInUp bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#14242c] transition-all duration-300 transform hover:scale-102 hover:shadow-xl cursor-pointer relative overflow-hidden"
//               style={{ animationDelay: '300ms', background: `linear-gradient(135deg, white 60%, rgba(20, 36, 44, 0.05))` }}
//               onClick={() => handleCardClick('/medical-review')}
//             >
//               <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/5 to-transparent z-0"></div>
//               <div className="relative z-10 flex items-start">
//                 <div className="rounded-full bg-[rgb(65,120,169)] p-3 mr-4 shadow-md">
//                   <AlertCircle size={20} className="text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">ICSR / AOI Cases</h3>
//                   <div className="flex items-center space-x-2">
//                     <p className="text-2xl font-bold text-gray-800">{stats.icsrCount} / {stats.aoiCount}</p>
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-900/10 rounded-full text-blue-900">
//                       Total: {stats.icsrCount + stats.aoiCount}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">(For Medical Reviewer)</p>
//                 </div>
//                 <ChevronRight size={18} className="text-blue-900 self-center" />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '400ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <Users size={18} className="mr-2 text-blue-900" />
//                   Patient Type Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">Distribution Analysis</span>
//                 </div>
//               </div>
//               <div className="h-80" ref={patientTypeChartRef}></div>
//             </div>

//             <div className="fadeIn bg-white rounded-lg shadow-sm p-6" style={{ animationDelay: '600ms' }}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                   <MessageSquare size={18} className="mr-2 text-blue-900" />
//                   Comments Distribution
//                 </h3>
//                 <div className="px-3 py-1 bg-blue-900/10 rounded-full">
//                   <span className="text-xs font-medium text-blue-900">ICSR & AOI Analysis</span>
//                 </div>
//               </div>
//               <div className="h-72" ref={commentsChartRef}></div>
//             </div>
//           </div>

//           <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                 <Calendar size={18} className="mr-2 text-blue-900" />
//                 Monthly Article Processing
//               </h3>
//             </div>
//             <div className="h-80" ref={timelineChartRef}></div>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes growWidth {
//           from { width: 0; }
//           to { width: 100%; }
//         }

//         .fadeIn {
//           opacity: 0;
//           animation: fadeIn 0.7s ease-out forwards;
//         }

//         .slideInUp {
//           opacity: 0;
//           animation: slideInUp 0.7s ease-out forwards;
//         }

//         .growWidth {
//           width: 0;
//           animation: growWidth 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { debounce } from 'lodash';
import { Mail, FileText, AlertCircle, Users, MessageSquare, Calendar, ChevronRight, BarChart2 } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    eMailCount: 0,
    articleCount: 0,
    icsrCount: 0,
    aoiCount: 0
  });
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);
  const [patientTypeData, setPatientTypeData] = useState([]);
  const [casualityData, setCasualityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChartRendered, setIsChartRendered] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [emailFilter, setEmailFilter] = useState(null);
  const patientTypeChartRef = useRef(null);
  const casualityChartRef = useRef(null);
  const commentsChartRef = useRef(null);
  const timelineChartRef = useRef(null);
  const drugChartRef = useRef(null);
  const [drugCount, setDrugCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
const [approvedArticles, setApprovedArticles] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: getLastSevenDaysStart(),
    endDate: new Date().toISOString().split('T')[0]
  });

  // Color constants from the first snippet
  const PRIMARY_COLOR = '#14242c';
  const COLOR_PALETTE = useMemo(() => [
    '#14242c',
    '#386790',
    '#26455e',
    '#2f5677',
    '#386790',
    '#4178a9'
  ], []);
  const ACCENT_COLOR = '#4178a9';
  const LIGHT_BG = '#f8fafc';
  const TEXT_COLOR = '#2c3e50';
  const MUTED_TEXT = '#64748b';
  const BORDER_COLOR = '#e2e8f0';

  const rawDataCache = useRef(null);

  function getLastSevenDaysStart() {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    return sevenDaysAgo.toISOString().split('T')[0];
  }
const fetchRawData = useCallback(async () => {
  if (rawDataCache.current) {
    return rawDataCache.current;
  }
  try {
    setLoading(true);
    setError(null);
    const response = await DatabaseService.fetchDashboardData(); // Returns { data, emailCount }
    console.log('Raw dashboard response:', response);
    const icsrRecords = response.data.filter(item => 
      item['Comments (ICSR, AOI, Not selected)'] === 'ICSR'
    );
    console.log('ICSR records in raw data:', icsrRecords.length, icsrRecords);
    const { data, emailCount } = response;
    const processedData = data.map(item => {
      const dateField = "IRD"; // Changed to IRD
      let date, year, month, displayDate;
      if (item[dateField]) {
        const dateStr = item[dateField].toString().trim(); // Ensure no extra spaces
        console.log('Processing IRD:', dateStr, 'for item:', item);
        const [day, monthStr, yearStr] = dateStr.split('-'); // Split dd-mm-yyyy
        if (day && monthStr && yearStr) {
          // Reorder to YYYY-MM-DD for new Date()
          const formattedDate = `${yearStr}-${monthStr}-${day}`;
          date = new Date(formattedDate);
          console.log('Formatted date:', formattedDate, 'Parsed date:', date);
          if (!isNaN(date.getTime())) {
            year = date.getFullYear();
            month = date.getMonth() + 1; // 0-based to 1-based
            displayDate = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          } else {
            console.log('Invalid date after formatting for item:', formattedDate, 'Full item:', item);
          }
        } else {
          console.log('Malformed date string for item:', dateStr, 'Full item:', item);
        }
      } else {
        console.log('Missing IRD for item:', item);
      }
      const commentsField = "Comments (ICSR, AOI, Not selected)";
      const comments = item[commentsField] ? item[commentsField].toString().toUpperCase() : 'Others';
      const patientTypeField = Object.keys(item).find(key =>
        key.toLowerCase().includes('patient') && key.toLowerCase().includes('type')
      );
      const patientType = patientTypeField && item[patientTypeField] ? item[patientTypeField].toString().trim() : 'Unknown';
      return { date, year, month, displayDate, email: item.Mail, comments, patientType };
    }).filter(item => {
      if (!item.date || (item.date && isNaN(item.date.getTime()))) {
        if (item.comments === 'ICSR') {
          console.log('ICSR retained with invalid date:', item);
          return true; // Keep ICSRs with invalid dates
        }
        return false; // Drop non-ICSRs with invalid dates
      }
      return true; // Keep valid dates
    });
    const totalArticleCount = data.length; // Add total article count
    rawDataCache.current = { processedData, emailCount, totalArticleCount }; // Update cache
    console.log('Processed data length:', processedData.length, 'with ICSRs:', processedData.filter(item => item.comments === 'ICSR').length);
    setLoading(false);
    return rawDataCache.current;
  } catch (err) {
    console.error('Error fetching dashboard data:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
    setError(err.response?.data?.error || 'Failed to load dashboard data');
    setLoading(false);
    return { processedData: [], emailCount: 0 };
  }
}, []);

const totalIcsrRef = useRef(0);

const processDashboardData = useCallback(async (year, start, end) => {
  const rawData = await fetchRawData();
  const { processedData, emailCount } = rawData;
  if (!processedData || processedData.length === 0) {
    setStats({ eMailCount: 0, articleCount: 0, icsrCount: 0, aoiCount: 0 });
    setPatientTypeData([]);
    setCommentsData([]);
    setTimelineData([]);
    setAvailableYears([new Date().getFullYear()]);
    console.log('processDashboardData: Resetting states due to empty data');
    return;
  }

  let totalIcsrCount = processedData.filter(item => item.comments === 'ICSR').length;
  const icsrCountsByMonth = {};
  const allYears = new Set();

  processedData.forEach(item => {
    const { year: itemYear, month, comments } = item;
    allYears.add(itemYear);

    if (comments === 'ICSR' && item.year && item.month) { // Only count if year and month are defined
      const monthKey = `${itemYear}-${month.toString().padStart(2, '0')}`;
      icsrCountsByMonth[monthKey] = (icsrCountsByMonth[monthKey] || 0) + 1;
    }
  });

  // Debugging to confirm total ICSR count
  console.log('Processed ICSR count (totalIcsrCount):', totalIcsrCount);
  const allIcsrRecords = processedData.filter(item => item.comments === 'ICSR');
  console.log('All ICSR records in processedData:', allIcsrRecords.length, allIcsrRecords);

  const timelineArray = Object.keys(icsrCountsByMonth).map(key => {
    const [year, month] = key.split('-');
    return {
      year: parseInt(year),
      month: parseInt(month),
      count: icsrCountsByMonth[key],
      displayDate: new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' })
    };
  }).sort((a, b) => a.month - b.month);

  const { totalArticleCount } = await fetchRawData(); // Ensure totalArticleCount is fetched
  totalIcsrRef.current = totalIcsrCount; // Persist total ICSR count
  setStats({
    eMailCount: emailCount,
    articleCount: totalArticleCount,
    icsrCount: totalIcsrRef.current, // Use persisted total
    aoiCount: 0
  }); 

  // Debugging after setStats
  console.log('Stats set - ICSR Count:', stats.icsrCount, 'Total Articles:', stats.articleCount);

  setPatientTypeData([]);
  setCommentsData([]);
  setTimelineData(timelineArray);
  setAvailableYears(Array.from(allYears).sort());
  console.log('processDashboardData: Timeline ICSR sum:', timelineArray.reduce((sum, d) => sum + d.count, 0));
}, [fetchRawData]);
  // Debounced data processing
  const debouncedProcessDashboardData = useMemo(
    () => debounce(processDashboardData, 50),
    [processDashboardData]
  );

  // Trigger data processing on filter change
  useEffect(() => {
  rawDataCache.current = null; // Clear cache on filter change
  debouncedProcessDashboardData(selectedYear, startMonth, endMonth);
  const timer = setTimeout(() => setIsChartRendered(true), 50);
  return () => {
    clearTimeout(timer);
    d3.select("#comments-tooltip").style("opacity", 0);
    d3.select("#patient-tooltip").style("opacity", 0);
    d3.select("#timeline-tooltip").style("opacity", 0);
    d3.select("#casuality-tooltip").style("opacity", 0);
  };
}, [selectedYear, startMonth, endMonth, debouncedProcessDashboardData]);
useEffect(() => {
  console.log('Stats updated - ICSR Count:', stats.icsrCount, 'Ref Total:', totalIcsrRef.current);
  if (stats.icsrCount !== totalIcsrRef.current) {
    setStats(prevStats => ({
      ...prevStats,
      icsrCount: totalIcsrRef.current
    }));
  }
}, [stats.icsrCount]);
useEffect(() => {
  const fetchApprovedCount = async () => {
    try {
      console.log('Starting fetchApprovedCount...');
      const response = await fetch('/api/approved-count', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Response received:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch failed with status:', response.status, errorText);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setApprovedCount(data.approvedCount || 0);
      console.log('Set approvedCount to:', data.approvedCount || 0);
    } catch (error) {
      console.error('Error fetching approved count:', error);
      setApprovedCount(0);
    }
  };
  fetchApprovedCount();
}, []);

useEffect(() => {
  const fetchDrugCount = async () => {
    try {
      console.log('Starting fetchDrugCount...', 'URL:', 'http://localhost:5000/api/drug-count');
      const response = await fetch('http://localhost:5000/api/drug-count');
      console.log('Response received:', response.status, 'OK:', response.ok);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch failed with status:', response.status, 'Details:', errorText);
        throw new Error(`Network response was not ok - ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data from API:', data);
      setDrugCount(data.drugCount || 0);
      console.log('Set drugCount to:', data.drugCount || 0);
    } catch (error) {
      console.error('Error fetching drug count:', error.message, 'Stack:', error.stack);
      setDrugCount(0);
    }
  };
  fetchDrugCount();
}, []);

// Add this to log state changes
useEffect(() => {
  console.log('Current approvedCount state:', approvedCount);
  console.log('Current drugCount state:', drugCount);
  console.log('Current stats state:', stats);
}, [approvedCount, drugCount, stats]);
  // Render charts when data is ready
  useEffect(() => {
  if (!loading && isChartRendered) {
    renderPatientTypeChart();
    renderCommentsChart();
    renderTimelineChart(); // Ensure this is included
    if (casualityData.length > 0) renderCasualityChart();
  }
}, [loading, isChartRendered, patientTypeData, commentsData, timelineData, casualityData, emailFilter]);

  // Patient type chart rendering (from first snippet)
  const renderPatientTypeChart = useCallback(() => {
    if (!patientTypeChartRef.current) return;

    d3.select(patientTypeChartRef.current).selectAll("*").remove();

    if (patientTypeData.length === 0) {
      d3.select(patientTypeChartRef.current)
        .append("div")
        .attr("class", "flex justify-center items-center h-full")
        .append("p")
        .attr("class", "text-gray-500")
        .text("No data available for the selected filters");
      return;
    }

    const margin = { top: 30, right: 30, bottom: 60, left: 50 };
    const width = patientTypeChartRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3.select(patientTypeChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(patientTypeData.map(d => d.type))
      .range([0, width])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(patientTypeData, d => d.count) * 1.2])
      .range([height, 0]);

    svg.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-width)
        .tickFormat(""))
      .select(".domain")
      .remove();

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(0))
      .select(".domain")
      .attr("stroke", BORDER_COLOR);

    svg.selectAll(".tick text")
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .style("font-weight", "400")
      .style("fill", TEXT_COLOR)
      .attr("dy", ".5em")
      .attr("dx", "-.8em")
      .attr("transform", "rotate(-25)");

    svg.append("g")
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => d)
        .tickSize(0))
      .select(".domain")
      .attr("stroke", BORDER_COLOR);

    svg.selectAll("g.tick text")
      .style("font-size", "12px")
      .style("fill", MUTED_TEXT);

    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", ACCENT_COLOR)
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", PRIMARY_COLOR)
      .attr("stop-opacity", 0.8);

    defs.append("filter")
      .attr("id", "shadow")
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "2")
      .attr("stdDeviation", "2")
      .attr("flood-opacity", "0.2");

    svg.selectAll(".bar")
      .data(patientTypeData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.type))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("rx", 4)
      .attr("fill", "url(#bar-gradient)")
      .attr("filter", "url(#shadow)")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", ACCENT_COLOR);

        const tooltip = d3.select("body").select("#patient-tooltip");
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.type}:</strong> ${d.count}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "url(#bar-gradient)");

        d3.select("body").select("#patient-tooltip").style("opacity", 0);
      })
      .on("click", function(event, d) {
        const queryParams = new URLSearchParams();
        queryParams.set('patientType', encodeURIComponent(d.type));
        queryParams.set('startMonth', startMonth);
        queryParams.set('endMonth', endMonth);
        queryParams.set('year', selectedYear);
        navigate(`/cases?${queryParams.toString()}`);
        d3.select("#patient-tooltip").style("opacity", 0); // Hide tooltip on click
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count));

    svg.selectAll(".value-label")
      .data(patientTypeData)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.type) + x.bandwidth() / 2)
      .attr("y", d => y(d.count) - 8)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", PRIMARY_COLOR)
      .style("opacity", 0)
      .text(d => d.count)
      .transition()
      .duration(800)
      .delay((d, i) => 200 + i * 100)
      .style("opacity", 1);

    if (!d3.select("body").select("#patient-tooltip").node()) {
      d3.select("body")
        .append("div")
        .attr("id", "patient-tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "white")
        .style("border-radius", "4px")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", 10);
    }
  }, [patientTypeData, startMonth, endMonth, selectedYear, navigate]);

  const renderCommentsChart = useCallback(() => {
  if (!commentsChartRef.current) return;

  d3.select(commentsChartRef.current).selectAll("*").remove();

  if (commentsData.length === 0 || commentsData.every(d => d.count === 0)) {
    d3.select(commentsChartRef.current)
      .append("div")
      .attr("class", "flex justify-center items-center h-full")
      .append("p")
      .attr("class", "text-gray-500")
      .text("No data available for the selected filters");
    return;
  }

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = commentsChartRef.current.clientWidth - margin.left - margin.right;
  const height = 370 - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select(commentsChartRef.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

  const total = commentsData.reduce((sum, d) => sum + d.count, 0);
  commentsData.forEach(d => {
    d.percentage = total > 0 ? (d.count / total) * 100 : 0;
  });

  const commentsColors = {
    ICSR: "#14242c",
    AOI: "#4178a9",
    Others: "#26455e"
  };

  const pie = d3.pie()
    .value(d => d.count)
    .sort(null)
    .padAngle(0.03);

  const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8)
    .cornerRadius(4);

  const hoverArc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.85)
    .cornerRadius(4);

  const path = svg.selectAll(".arc")
    .data(pie(commentsData))
    .enter()
    .append("g")
    .attr("class", "arc");

  path.append("path")
    .attr("d", arc)
    .attr("fill", d => commentsColors[d.data.status] || "#386790")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .style("opacity", 0.9)
    .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", hoverArc)
        .style("opacity", 1);

      const tooltipContent = `
        <div class="p-2">
          <div class="font-bold">${d.data.status}</div>
          <div>${d.data.count} (${d.data.percentage.toFixed(1)}%)</div>
        </div>
      `;

      d3.select("#comments-tooltip")
        .style("opacity", 1)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 28}px`)
        .html(tooltipContent);
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arc)
        .style("opacity", 0.9);

      d3.select("#comments-tooltip").style("opacity", 0);
    })
    .on("click", function(event, d) {
      if (d.data.status === "ICSR" || d.data.status === "AOI") {
        const queryParams = new URLSearchParams();
        queryParams.set('comments', encodeURIComponent(d.data.status));
        queryParams.set('startMonth', startMonth);
        queryParams.set('endMonth', endMonth);
        queryParams.set('year', selectedYear);
        navigate(`/cases?${queryParams.toString()}`);
        d3.select("#comments-tooltip").style("opacity", 0); // Hide tooltip on click
      }
    })
    .transition()
    .duration(1000)
    .attrTween("d", function(d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function(t) {
        return arc(interpolate(t));
      };
    });

  const arcLabels = svg.selectAll(".arc-label")
    .data(pie(commentsData))
    .enter()
    .append("text")
    .attr("class", "arc-label")
    .attr("transform", d => {
      const centroid = arc.centroid(d);
      const x = centroid[0] * 1.0;
      const y = centroid[1] * 1.0;
      return `translate(${x}, ${y})`;
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .style("font-size", "11px")
    .style("font-weight", "bold")
    .style("fill", "#fff")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .text(d => d.data.count)
    .transition()
    .delay(1000)
    .duration(500)
    .style("opacity", d => d.data.percentage < 1 ? 0 : 1);

  commentsData.forEach((d, i) => {
    if (d.status === "ICSR" && d.percentage < 3) {
      const pieData = pie(commentsData)[i];
      const centroid = arc.centroid(pieData);
      const x = centroid[0] * 1.5;
      const y = centroid[1] * 1.5;

      svg.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#14242c")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .transition()
        .delay(1000)
        .duration(500)
        .attr("opacity", 1);

      svg.append("text")
        .attr("x", x + 10)
        .attr("y", y)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#14242c")
        .text(`ICSR: ${d.count} (${d.percentage.toFixed(1)}%)`)
        .attr("opacity", 0)
        .transition()
        .delay(1100)
        .duration(500)
        .attr("opacity", 1);
    }
  });

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.5em")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("fill", PRIMARY_COLOR)
    .text("Comments");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("fill", PRIMARY_COLOR)
    .text("Distribution");

  const legend = svg.selectAll(".legend")
    .data(pie(commentsData))
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

  legend.append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("rx", 3)
    .attr("fill", d => commentsColors[d.data.status] || "#386790")
    .style("opacity", 0)
    .style("cursor", d => (d.data.status === "ICSR" || d.data.status === "AOI") ? "pointer" : "default")
    .on("click", function(event, d) {
      if (d.data.status === "ICSR" || d.data.status === "AOI") {
        const queryParams = new URLSearchParams();
        queryParams.set('comments', encodeURIComponent(d.data.status));
        queryParams.set('startMonth', startMonth);
        queryParams.set('endMonth', endMonth);
        queryParams.set('year', selectedYear);
        navigate(`/cases?${queryParams.toString()}`);
        d3.select("#comments-tooltip").style("opacity", 0); // Hide tooltip on click
      }
    })
    .transition()
    .delay((d, i) => 1000 + i * 100)
    .duration(500)
    .style("opacity", 1);

  legend.append("text")
    .attr("x", 25)
    .attr("y", 12)
    .text(d => `${d.data.status}: ${d.data.count}`)
    .style("font-size", "12px")
    .style("font-weight", "medium")
    .style("fill", TEXT_COLOR)
    .style("opacity", 0)
    .transition()
    .delay((d, i) => 1100 + i * 100)
    .duration(500)
    .style("opacity", 1);

  if (!document.getElementById("comments-tooltip")) {
    d3.select("body")
      .append("div")
      .attr("id", "comments-tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 10);
  }
}, [commentsData, startMonth, endMonth, selectedYear, navigate]);

  // Timeline chart rendering (from first snippet)
  const renderTimelineChart = useCallback(() => {
  if (!timelineChartRef.current) return;

  const filteredData = timelineData.filter((d) => d.year === selectedYear);
  const monthRangeFilteredData = filteredData.filter(
    (d) => d.month >= startMonth && d.month <= endMonth
  );

  if (monthRangeFilteredData.length === 0) {
    d3.select(timelineChartRef.current).selectAll("*").remove();
    d3.select(timelineChartRef.current)
      .append("div")
      .attr("class", "flex items-center justify-center h-full")
      .append("p")
      .attr("class", "text-gray-500")
      .text("No ICSR data available for the selected filters");
    return;
  }

  d3.select(timelineChartRef.current).selectAll("*").remove();

  const margin = { top: 40, right: 80, bottom: 70, left: 60 };
  const width = timelineChartRef.current.clientWidth - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3
    .select(timelineChartRef.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scalePoint()
    .domain(monthRangeFilteredData.map((d) => d.displayDate))
    .range([0, width])
    .padding(0.5);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(monthRangeFilteredData, (d) => d.count) * 1.2 || 10])
    .range([height, 0]);

  // Grid lines
  svg
    .append("g")
    .attr("class", "grid")
    .attr("opacity", 0.1)
    .call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("")
    )
    .select(".domain")
    .remove();

  // X-axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain")
    .attr("stroke", BORDER_COLOR)
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "12px")
    .style("fill", TEXT_COLOR)
    .attr("dy", "0.5em")
    .attr("dx", "-0.8em")
    .attr("transform", "rotate(-45)");

  // Y-axis
  svg
    .append("g")
    .call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickFormat((d) => d)
        .tickSize(0)
    )
    .select(".domain")
    .attr("stroke", BORDER_COLOR)
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", MUTED_TEXT);

  // Area fill
  const area = d3
    .area()
    .x((d) => x(d.displayDate))
    .y0(height)
    .y1((d) => y(d.count))
    .curve(d3.curveMonotoneX);

  const defs = svg.append("defs");
  const gradient = defs
    .append("linearGradient")
    .attr("id", "area-gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", PRIMARY_COLOR)
    .attr("stop-opacity", 0.1);

  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", PRIMARY_COLOR)
    .attr("stop-opacity", 0.4);

  svg
    .append("path")
    .datum(monthRangeFilteredData)
    .attr("fill", "url(#area-gradient)")
    .attr("d", area);

  // Line
  const line = d3
    .line()
    .x((d) => x(d.displayDate))
    .y((d) => y(d.count))
    .curve(d3.curveMonotoneX);

  const path = svg
    .append("path")
    .datum(monthRangeFilteredData)
    .attr("fill", "none")
    .attr("stroke", PRIMARY_COLOR)
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)
    .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

  const pathLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", pathLength)
    .attr("stroke-dashoffset", pathLength)
    .transition()
    .duration(1500)
    .attr("stroke-dashoffset", 0);

  // Points
  svg
    .selectAll(".point")
    .data(monthRangeFilteredData)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d) => x(d.displayDate))
    .attr("cy", (d) => y(d.count))
    .attr("r", 5)
    .attr("fill", ACCENT_COLOR)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
    .on("mouseover", function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 7)
        .attr("stroke-width", 3);

      d3.select("#timeline-tooltip")
        .style("opacity", 1)
        .style("background", "#fff")
        .style("border", `1px solid ${BORDER_COLOR}`)
        .style("padding", "8px")
        .style("border-radius", "6px")
        .style("box-shadow", "0 4px 6px rgba(0,0,0,0.1)")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 28}px`)
        .html(`
          <div class="text-sm">
            <div class="font-bold text-gray-800">${d.displayDate}</div>
            <div class="text-gray-600">ICSR Count: ${d.count}</div>
          </div>
        `);
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 5)
        .attr("stroke-width", 2);

      d3.select("#timeline-tooltip").style("opacity", 0);
    })
    .transition()
    .duration(300)
    .delay((d, i) => 1500 + i * 50)
    .style("opacity", 1);

  if (!document.getElementById("timeline-tooltip")) {
    d3.select("body")
      .append("div")
      .attr("id", "timeline-tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 10);
  }
}, [timelineData, selectedYear, startMonth, endMonth]);

  // Casuality chart rendering (from first snippet)
  const renderCasualityChart = useCallback(() => {
    if (!casualityChartRef.current || casualityData.length === 0) return;

    d3.select(casualityChartRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = casualityChartRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(casualityChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    const total = casualityData.reduce((sum, d) => sum + d.count, 0);
    casualityData.forEach(d => {
      d.percentage = (d.count / total) * 100;
    });

    const color = d3.scaleOrdinal()
      .domain(casualityData.map(d => d.status))
      .range(COLOR_PALETTE);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const hoverArc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.85);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const path = svg.selectAll(".arc")
      .data(pie(casualityData))
      .enter()
      .append("g")
      .attr("class", "arc");

    path.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.status))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("opacity", 0.9)
      .style("filter", "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", hoverArc)
          .style("opacity", 1);

        const tooltipContent = `
          <div class="p-2">
            <div class="font-bold">${d.data.status}</div>
            <div>${d.data.count} (${Math.round(d.data.percentage)}%)</div>
          </div>
        `;

        d3.select("#casuality-tooltip")
          .style("opacity", 1)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`)
          .html(tooltipContent);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc)
          .style("opacity", 0.9);

        d3.select("#casuality-tooltip").style("opacity", 0);
      })
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    svg.selectAll(".percentage-label")
      .data(pie(casualityData))
      .enter()
      .append("text")
      .attr("class", "percentage-label")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#000")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .text(d => `${Math.round(d.data.percentage)}%`)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", PRIMARY_COLOR)
      .text("Casuality");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", PRIMARY_COLOR)
      .text("Validation");

    const legend = svg.selectAll(".legend")
      .data(pie(casualityData))
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius + 30}, ${-radius + 25 + i * 25})`);

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("rx", 3)
      .attr("fill", d => color(d.data.status))
      .style("opacity", 0)
      .transition()
      .delay((d, i) => 1000 + i * 100)
      .duration(500)
      .style("opacity", 1);

    legend.append("text")
      .attr("x", 25)
      .attr("y", 12)
      .text(d => d.data.status)
      .style("font-size", "12px")
      .style("font-weight", "medium")
      .style("fill", TEXT_COLOR)
      .style("opacity", 0)
      .transition()
      .delay((d, i) => 1100 + i * 100)
      .duration(500)
      .style("opacity", 1);

    if (!document.getElementById("casuality-tooltip")) {
      d3.select("body")
        .append("div")
        .attr("id", "casuality-tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", 10);
    }
  }, [casualityData]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatNumber = num => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

  const handleCardClick = route => navigate(route);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="fadeIn mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <div className="flex items-center mt-2">
          <div className="h-1 w-10 bg-blue-900 rounded mr-3"></div>
          <p className="text-gray-600">DeepForrest AI Literature Assistant | {currentDate}</p>
        </div>
      </div>

      <div className="fadeIn mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2 items-center">
          <select
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
            value={startMonth}
            onChange={(e) => setStartMonth(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
              <option key={month} value={month}>
                From: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm"
            value={endMonth}
            onChange={(e) => setEndMonth(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
              <option key={month} value={month}>
                To: {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <button
            className="px-3 py-1 bg-blue-900/10 text-blue-900 rounded-md text-sm font-medium hover:bg-blue-900/20 transition-colors"
            onClick={() => {
              setSelectedYear(new Date().getFullYear());
              setStartMonth(1);
              setEndMonth(12);
              setSelectedMonth(null);
              setEmailFilter(null);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
            <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-900 border-t-transparent"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4 bg-white rounded-lg shadow-sm">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div
    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
    onClick={() => {
      const queryParams = new URLSearchParams();
      queryParams.set('year', selectedYear);
      queryParams.set('startMonth', startMonth);
      queryParams.set('endMonth', endMonth);
      queryParams.set('filterType', 'uniqueEmailsWithDate');
      const route = localStorage.getItem('roleId') === '2' ? '/medical-review' : '/literature-review';
      navigate(`${route}?${queryParams.toString()}`);
    }}
  >
    <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
    <div className="relative z-10 flex items-center">
      <div className="rounded-full bg-blue-900 p-3 mr-4 shadow-sm">
        <Mail size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-1">Emails</h3>
        <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.eMailCount)}</p>
        <p className="text-xs text-gray-500 mt-1">Total unique correspondence</p>
      </div>
    </div>
  </div>

  <div
    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
    onClick={() => handleCardClick('/cases')}
  >
    <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
    <div className="relative z-10 flex items-center">
      <div className="rounded-full bg-blue-900 p-3 mr-4 shadow-sm">
        <FileText size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-1">All Articles</h3>
        <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.articleCount)}</p>
        <p className="text-xs text-gray-500 mt-1">Literature reviews collected</p>
      </div>
    </div>
  </div>

  <div
    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
    onClick={() => {
  const queryParams = new URLSearchParams();
  queryParams.set('comments', 'ICSR');
  queryParams.set('showTotal', 'true'); // Request total count
  navigate(`/cases?${queryParams.toString()}`);
}}
  >
    <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
    <div className="relative z-10 flex items-center">
      <div className="rounded-full bg-blue-900 p-3 mr-4 shadow-sm">
        <AlertCircle size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-1">ICSR Count</h3>
        <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.icsrCount)}</p>
        <p className="text-xs text-gray-500 mt-1">View ICSR Articles</p>
      </div>
    </div>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div
  key={drugCount} // Forces re-render on drugCount change
  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
  style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
>
  <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
  <div className="relative z-10 flex items-center">
    <div className="rounded-full bg-blue-900 p-3 mr-4 shadow-sm">
      <BarChart2 size={20} className="text-white" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Drug Count</h3>
      <p className="text-3xl font-bold text-gray-900">
        {formatNumber(drugCount)} <span style={{ fontSize: '12px' }}> </span>
      </p>
      <p className="text-xs text-gray-500 mt-1">Unique drugs recorded</p>
    </div>
  </div>
</div>
  <div
  key={approvedCount}
  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
  style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
>
  <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
  <div className="relative z-10 flex items-center">
    <div className="rounded-full bg-blue-900 p-3 mr-4 shadow-sm">
      <FileText size={20} className="text-white" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-1">Approved Articles for Medical Admin</h3>
      <p className="text-3xl font-bold text-gray-900">
        {formatNumber(approvedCount)} <span style={{ fontSize: '12px' }}> </span>
      </p>
      <p className="text-xs text-gray-500 mt-1">Total articles sent for medical admin</p>
    </div>
  </div>
</div>
  <div
    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 60%, rgba(65, 120, 169, 0.05))` }}
    onClick={() => {
      const queryParams = new URLSearchParams();
      queryParams.set('year', selectedYear);
      queryParams.set('startMonth', startMonth);
      queryParams.set('endMonth', endMonth);
      navigate(`/drugs?${queryParams.toString()}`);
    }}
  >
    <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-blue-900/10 to-transparent z-0"></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <BarChart2 size={18} className="text-sm font-semibold text-gray-600 mb-1" />
          Drug
        </h3>
        <p className="text-xs text-gray-500 mt-1">View drug distribution and analysis.</p>
      </div>
      <div className="px-2 py-1 bg-blue-900/10 rounded-full">
        <span className="text-xs font-medium text-blue-900">Drug Analysis</span>
      </div>
    </div>
  </div>
</div>

          <div className="fadeIn bg-white rounded-lg shadow-sm p-6 mb-8" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <Calendar size={18} className="mr-2 text-blue-900" />
                Monthly ICSR Counts
              </h3>
            </div>
            <div className="h-80" ref={timelineChartRef}></div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }

        .fadeIn {
          opacity: 0;
          animation: fadeIn 0.7s ease-out forwards;
        }

        .slideInUp {
          opacity: 0;
          animation: slideInUp 0.7s ease-out forwards;
        }

        .growWidth {
          width: 0;
          animation: growWidth 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;