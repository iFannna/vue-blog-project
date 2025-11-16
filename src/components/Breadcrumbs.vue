<script setup></script>

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
            <meta name="numberOfItems" content="2" /><meta
              name="itemListOrder"
              content="Ascending"
            />
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="http://schema.org/ListItem"
              class="trail-item trail-begin"
            >
              <a
                href="/"
                rel="home"
                itemprop="item"
                ><span itemprop="name">Home</span></a
              ><meta itemprop="position" content="1" />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="http://schema.org/ListItem"
              class="trail-item trail-end"
            >
              <span><span itemprop="name">About</span></span
              ><meta itemprop="position" content="2" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>

<style scoped></style>