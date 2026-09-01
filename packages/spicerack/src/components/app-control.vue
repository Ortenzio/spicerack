<template>

  <!-- folders / tabs -->
  <component v-if="hasConfig" :is v-bind="itemProps">
    <app-control v-for="d in item.config" :item="d" :model :registry :key="d.key ?? d.type" />
  </component>

  <!-- data-bound controls -->
  <component v-else-if="hasModel" :is v-model="model[item.key].value" v-bind="itemProps" />

  <!-- modelless controls (buttons / dividers) -->
  <component v-else :is v-bind="itemProps" />

</template>

<script setup>
import { RESERVED_PROPS } from '@/constants/reserved-props';

import { getControlType } from '@/utils/get-control-type';
import { omitProps } from '@/utils/omit-props';

const props = defineProps({
  item: { type: Object, required: true },
  model: { type: Object, required: true },
  registry: { type: Object, required: true }
});

const hasConfig = Object.hasOwn(props.item, 'config');
const hasModel = Object.hasOwn(props.model, props.item.key);
const is = props.registry.get(getControlType(props.item));
const itemProps = omitProps(props.item, RESERVED_PROPS);
</script>