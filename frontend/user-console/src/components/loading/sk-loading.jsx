import React from "react";

function SKLoading({ className }) {
  return (
    <div class={`sk-chase ${className}`}>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  );
}

export default SKLoading;
