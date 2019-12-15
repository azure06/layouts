import { NuxtAxiosInstance } from '@nuxtjs/axios';

// https://axios.nuxtjs.org/extend.html
export default function({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.setBaseURL('');
}
