<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <LgsButton disabled>默认按钮</LgsButton>
      <LgsButton type="primary" disabled>主要按钮</LgsButton>
      <LgsButton type="success" disabled>成功按钮</LgsButton>
      <LgsButton type="warning" disabled>警告按钮</LgsButton>
      <LgsButton type="danger" disabled>危险按钮</LgsButton>
      <LgsButton type="info" disabled>信息按钮</LgsButton>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <LgsButton loading>加载中</LgsButton>
      <LgsButton type="primary" loading>加载中</LgsButton>
      <LgsButton type="success" loading>加载中</LgsButton>
    </div>
  </div>
</template>
