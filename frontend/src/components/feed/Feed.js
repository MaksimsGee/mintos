import Debug from 'debug';
import moment from 'moment';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

const debug = Debug('component:feed'); // eslint-disable-line

export default {
  data() {
    return {
      mostOccurrenceWords: [],
    };
  },
  computed: {
    ...mapGetters('Feed',[
      'feed',
      'title',
      'subtitle',
    ]),
    ...mapGetters('Excludes',[
      'excludes',
    ]),
  },
  methods: {
    ...mapActions('Excludes', {
      downloadExcludes: 'download',
    }),
    ...mapActions('Feed', {
      downloadFeed: 'download',
    }),
    getNormalizedTime(dateTime) {
      return moment(String(dateTime)).format('MM/DD/YYYY hh:mm');
    },
    getFeedLink(linkObj) {
      return _.get(linkObj, '@attributes.href', '');
    },
    getMostOccurrenceWords(limit = 10) {
      let words = [];
      const result = [];
      const schema = {};
      this.feed.forEach(arr => {
        words =_.concat(words, arr.summary
          .replace(/<[^>]*>?/gm, '')
          .replace(/–/g, '')
          .replace(/[0-9]/g, '')
          .split(' ')
          .filter(word => !this.excludes.has(word.toLowerCase()) && !_.isEmpty(word) && !_.isNumber(word)));
      });
      words.forEach(i => schema[i] = (schema[i]||0) + 1);

      (Object.keys(schema).sort((a,b) => schema[b]-schema[a]))
        .some((el, index) => {
          result.push({ name: el, count: schema[el] });
          if (limit > index+1) {
            return false;
          }
          return true;
        });

      return result;
    },
  },
  mounted() {
    debug('mounted');

    this.downloadFeed()
      .then(() => this.downloadExcludes()
        .then(() => this.mostOccurrenceWords = this.getMostOccurrenceWords()));
  },
};
