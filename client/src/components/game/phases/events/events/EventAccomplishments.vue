<template>
    <component :is="eventAccomplishmentsView"></component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EffortsWasted from './views/EffortsWasted.vue';

@Component({
  components: {
    EffortsWasted
  }
})
export default class EventAccomplishments extends Vue {
  @Prop({ default: '' }) eventView!: string;

  get eventAccomplishmentsView(): string {
    switch (this.eventView) {
      case 'EFFORTS_WASTED':
        return 'EffortsWasted';
      default:
        return '';
    }
  }
}
</script>
