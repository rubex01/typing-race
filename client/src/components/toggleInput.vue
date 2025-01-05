<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
 <div class="toggle-input">
   <button class="toggle-input-button" @click="$emit('update:modelValue', !modelValue)">
     <svg viewBox="0 0 724 414" fill="none" xmlns="http://www.w3.org/2000/svg" class="toggle-input-button-container">
       <g filter="url(#filter0_i_192_4)">
         <rect x="20" y="20" width="684" height="374" rx="187" fill="url(#paint0_linear_192_4)"/>
       </g>
       <rect x="10" y="10" width="704" height="394" rx="197" stroke="url(#paint1_radial_192_4)" stroke-width="20"/>
       <defs>
         <filter id="filter0_i_192_4" x="0" y="0" width="734" height="414" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
           <feFlood flood-opacity="0" result="BackgroundImageFix"/>
           <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
           <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
           <feMorphology radius="32" operator="erode" in="SourceAlpha" result="effect1_innerShadow_192_4"/>
           <feOffset dx="10"/>
           <feGaussianBlur stdDeviation="17"/>
           <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
           <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"/>
           <feBlend mode="normal" in2="shape" result="effect1_innerShadow_192_4"/>
         </filter>
         <linearGradient id="paint0_linear_192_4" x1="20" y1="213.5" x2="704" y2="213.5" gradientUnits="userSpaceOnUse">
           <stop stop-color="#D6D6D6"/>
           <stop offset="1" stop-color="#C4C5C5"/>
         </linearGradient>
         <radialGradient id="paint1_radial_192_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(362 207) rotate(-88.6846) scale(435.615 796.686)">
           <stop stop-color="white"/>
           <stop offset="1" stop-color="#C0C0C0"/>
         </radialGradient>
       </defs>
     </svg>
     <svg viewBox="0 0 295 295" fill="none" xmlns="http://www.w3.org/2000/svg" class="toggle-input-button-knob" :class="modelValue ? 'toggle-input-button-knob-on' : 'toggle-input-button-knob-off'">
       <circle cx="147.5" cy="147.5" r="136.5" fill="#D9D9D9" stroke="url(#paint0_linear_193_7)" stroke-width="22"/>
       <defs>
         <linearGradient id="paint0_linear_193_7" x1="3.75" y1="125.833" x2="297.917" y2="125.833" gradientUnits="userSpaceOnUse">
           <stop stop-color="#BEBEBE"/>
           <stop offset="1" stop-color="#D9D9D9"/>
         </linearGradient>
       </defs>
     </svg>
   </button>
   <h2 class="toggle-input-label">
     {{ label }}
   </h2>
 </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.toggle-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &-label {
    font-size: 1.5rem;
    font-weight: bold;
    color: variables.$text;
    margin-left: auto;
  }

  &-button {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    display: flex;

    &-container {
      position: relative;
      width: 10rem;
    }

    &-knob {
      position: absolute;
      width: 4rem;
      margin-top: 0.8rem;
      border-radius: 50%;
      transition: .3s;
      transition-timing-function: cubic-bezier(0.68, -0.3, 0.27, 1.3);

      &-off {
        box-shadow: 5px 0 17px 3px rgba(0, 0, 0, .25);
        margin-left: 0.7rem;

        &:active {
          margin-left: 1rem;
          transform: scale(.9);
        }
      }

      &-on {
        margin-left: 5.3rem;
        box-shadow: -6px 0 17px 3px rgba(0, 0, 0, .25);

        &:active {
          margin-left: 5rem;
          transform: scale(.9);
        }
      }
    }
  }
}
</style>
