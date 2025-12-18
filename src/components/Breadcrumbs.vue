<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbNameMap = {
  '/': 'Home',
  '/blog': 'Blog',
  '/blog/detail': 'Article Detail',
  '/about': 'About'
}

// 生成多级面包屑的列表数据
const generateBreadcrumbList = () => {
  const pathArr = route.path.split('/').filter(Boolean)
  let currentPath = ''
  const breadcrumbList = []

  // 先添加首页
  breadcrumbList.push({
    name: breadcrumbNameMap['/'],
    path: '/',
    position: 1
  })

  // 遍历路径生成多级面包屑
  pathArr.forEach((segment, index) => {
    currentPath += `/${segment}`
    const position = index + 2 // 首页是1，后续依次递增
    breadcrumbList.push({
      name: breadcrumbNameMap[currentPath] || segment.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      path: currentPath,
      position
    })
  })

  return breadcrumbList
}

const breadcrumbList = generateBreadcrumbList()
</script>

<template>
  <div class="bloglo-breadcrumbs">
    <div class="bloglo-container bloglo-text-align-left">
      <nav
        role="navigation"
        aria-label="Breadcrumbs"
        class="breadcrumb-trail breadcrumbs"
        itemprop="breadcrumb"
      >
        <ul
          class="trail-items"
          itemscope
          itemtype="http://schema.org/BreadcrumbList"
        >
          <meta :content="breadcrumbList.length" name="numberOfItems" />
          <meta content="Ascending" name="itemListOrder" />
          
          <!-- 动态渲染所有面包屑项 -->
          <li
            v-for="(item, index) in breadcrumbList"
            :key="item.path"
            itemprop="itemListElement"
            itemscope
            itemtype="http://schema.org/ListItem"
            :class="['trail-item', index === 0 ? 'trail-begin' : index === breadcrumbList.length - 1 ? 'trail-end' : '']"
          >
            <!-- 最后一级无链接，其他级有链接 -->
            <template v-if="index === breadcrumbList.length - 1">
              <span><span itemprop="name">{{ item.name }}</span></span>
            </template>
            <template v-else>
              <a :href="item.path" itemprop="item"><span itemprop="name">{{ item.name }}</span></a>
            </template>
            <meta itemprop="position" :content="item.position" />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>