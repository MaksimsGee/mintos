<template lang="pug">
  div(:class='$style.root')
    div.col-12(v-if="feed.length")
      div.col-12.text-center.pb-4(v-if="mostOccurrenceWords.length")
        template(v-for="word in mostOccurrenceWords")
          b-button.m-1(variant="primary",size="sm")
            | {{ word.name }}
            |
            b-badge(variant="light") {{ word.count }}
      div.col-12.text-center.pb-5(v-else)
        h4 Calculating most occurrence words from feed.summary
      div.col-8.offset-2
        div.col-12.text-center.pb-4
          h4 {{ title }}
          h6 {{ subtitle }}
        template(v-for="post in feed")
          b-jumbotron(:header="post.title", header-level="5")
            template(slot="lead")
              a(:href="post.author.uri", target="_blank") {{ post.author.name }}
            p(v-html="post.summary")
            div.row
              div.col-6.text-left {{ getNormalizedTime(post.updated) }}
              div.col-6.text-right
                b-button(:href="getFeedLink(post.link)", target="_blank") OPEN
    template(v-else)
      div.col-12.text-center
        h4 Loading feed, it may take your life
</template>

<script src="./Feed.js"></script>
<style src="./Feed.scss" lang="scss" module></style>
