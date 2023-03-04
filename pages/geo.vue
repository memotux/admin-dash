<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { ExtendedFeature, geoNaturalEarth1, scaleQuantize, schemeBlues } from 'd3';

interface GeoFeatures {
  type: string
  propierties: {
    name: string
  }
  id: string
  geometry: {
    type: string
    coordinates: [number, number][][]
  }
}

interface GeoFeatData extends ParsedContent {
  geoFeat: { type: string, features: GeoFeatures[] }
}

interface GeoData extends ParsedContent {
  geo: { id: string, value: number }[]
}

const headData = {
  title: 'World Chart'
}
useSeoMeta(headData)

const { data } = await useAsyncData('geo', () => queryContent<GeoData>('/data/geo').findOne())
const { data: countries } = await useAsyncData('countries', () => queryContent<GeoFeatData>('/data/geofeat').findOne())

const featuredId = (d: ExtendedFeature) => d.id as string
</script>

<template>
  <VContainer>
    <Header v-bind="headData" />
    <VProgressCircular
      v-if="!data || !countries"
      indeterminate
      size="100"
      color="warning" />
    <VContainer v-else class="rounded-lg elevation-8 bg-primary-400">
      <GeoGraph
        :data="data.geo"
        :features="countries.geoFeat"
        :id="d => d.id"
        :value="d => d.value"
        :scale="scaleQuantize"
        :range="schemeBlues[9]"
        :projection="geoNaturalEarth1()"
        :width="975"
        :height="610"
        :featureId="featuredId"
        :title="(f, d) => `${f.properties!.name}: ${d?.value ?? 'N/D'}`" />
    </VContainer>
  </VContainer>
</template>