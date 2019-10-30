import Debug from 'debug';
import moment from 'moment';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { decodeXML } from 'entities';

const debug = Debug('component:feed'); // eslint-disable-line

export default {
  data() {
    return {
      mostOccurrenceWords: [],
    };
  },
  computed: {
    ...mapGetters('Feed', [
      'feed',
      'plain',
      'title',
      'subtitle',
    ]),
    ...mapGetters('Excludes', [
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
      const result = [];
      const schema = {};
      const words = decodeXML(this.plain)
        .replace(/<[^>]*>?/gm, '')
        .replace(/[0-9]|\s{2,}|,/g, '')
        .toLowerCase()
        .split(' ')
        .filter(el => el.length > 1 && !this.excludes.has(el));

      words.forEach(i => schema[i] = (schema[i] || 0) + 1);

      (Object.keys(schema).sort((a, b) => schema[b] - schema[a]))
        .some((el, index) => {
          result.push({ name: el, count: schema[el] });
          return limit <= index + 1;
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
