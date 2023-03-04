<script setup lang="ts">
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/choropleth
import * as d3 from 'd3'
import type { ExtendedFeature } from 'd3';
import type { GeoJsonProperties } from 'geojson';

const props = defineProps<{
  data: Array<{ id: string, value: number }>,
  id: (d: any) => string
  value: (d: any) => any
  title?: (f: ExtendedFeature, d: any) => string
  format?: any
  scale: any
  domain?: Iterable<d3.NumberValue> | ReturnType<typeof d3.extent>
  range?: Iterable<Range> | readonly string[]
  width: number
  height?: number
  projection: d3.GeoProjection
  features: d3.ExtendedFeatureCollection
  featureId: (d: ExtendedFeature) => string
  borders?: d3.GeoPermissibleObjects
  outline?: d3.GeoGeometryObjects | d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties> | d3.ExtendedFeatureCollection<d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>>
  unknown?: string
  fill?: string
  stroke?: string
  strokeLinecap?: string
  strokeLinejoin?: string
  strokeWidth?: number
  strokeOpacity?: number
}>()

// Compute values.
const N = d3.map(props.data, props.id);
const V = d3.map(props.data, props.value).map(d => d == null ? NaN : +d);
const Im = new d3.InternMap(N.map((id, i) => [id, i]));
const If = d3.map(props.features.features, props.featureId);
let domain = props.domain || undefined
let title: typeof props.title = props.title
let format: typeof props.format = props.format
const unknown = props.unknown || "#ccc" // fill color for missing data
const fill = props.fill || "white" // fill color for outline
const stroke = props.stroke || "white" // stroke color for borders
const strokeLinecap = props.strokeLinecap || "round" // stroke line cap for borders
const strokeLinejoin = props.strokeLinejoin || "round" // stroke line join for borders
const strokeWidth = props.strokeWidth || 1
const strokeOpacity = props.strokeOpacity || 1

// Compute default domains.
if (domain === undefined) domain = d3.extent(V);

// Construct scales.
const color = props.scale(domain, props.range);
if (color.unknown && unknown !== undefined) color.unknown(unknown);

// Compute titles.
if (title === undefined) {
  format = color.tickFormat(100, format);
  title = (f, i: number) => `${f.properties!.name}\n${format(V[i])}`;
} else if (title !== null) {
  const T = title;
  const O = d3.map(props.data, d => d);
  title = (f: any, i: number) => T(f, O[i]);
}

// Compute the default height. If an outline object is specified, scale the projection to fit
// the width, and then compute the corresponding height.
let height = props.height
if (props.height === undefined) {
  if (props.outline === undefined) {
    height = 400;
  } else {
    const [[x0, y0], [x1, y1]] = d3.geoPath(props.projection.fitWidth(props.width, props.outline)).bounds(props.outline);
    const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
    props.projection.scale(props.projection.scale() * (l - 1) / l).precision(0.2);
    height = dy;
  }
}

// Construct a path generator.
const path = d3.geoPath(props.projection);

onMounted(() => {
  let svg = d3.select("#geomap")
    .attr("width", props.width)
    .attr("height", height || 400)
    .attr("viewBox", [0, 0, props.width, height || 400])
    .attr("style", "width: 100%; height: auto; height: intrinsic;");

  if (props.outline != null) svg.append("path")
    .attr("fill", fill)
    .attr("stroke", "currentColor")
    .attr("d", path(props.outline));

  svg.append("g")
    .selectAll("path")
    .data(props.features.features)
    .join("path")
    .attr("fill", (d, i) => color(V[Im.get(If[i])!]))
    .attr("d", path)
    .append("title")
    .text((d, i) => title!(d, Im.get(If[i])));

  if (props.borders != null) svg.append("path")
    .attr("pointer-events", "none")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr("d", path(props.borders));
})
</script>

<template>
  <svg id="geomap" width="960" height="500" />
</template>