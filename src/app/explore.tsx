import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type ApiBook = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
};

type OpenLibraryResponse = { docs?: ApiBook[] };

export default function Explore() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<OpenLibraryResponse>('https://openlibrary.org/search.json', {
        params: { q: 'subject:fiction', limit: 15, fields: 'key,title,author_name,first_publish_year,subject' },
        timeout: 15000,
      });
      setBooks(response.data.docs ?? []);
    } catch {
      setError('Unable to load books. Check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <>
            <ThemedText type="subtitle" style={styles.header}>Explore</ThemedText>
            <ThemedText style={styles.subtitle}>Live book results from the Open Library public API</ThemedText>
            <View style={styles.apiBanner}>
              <ThemedText style={styles.apiBannerText}>API: openlibrary.org · Axios GET</ThemedText>
            </View>
            {loading ? <View style={styles.status}><ActivityIndicator size="large" color="#B51F3A" /><ThemedText style={styles.statusText}>Fetching books...</ThemedText></View> : null}
            {error ? <View style={styles.errorBox}><ThemedText style={styles.errorText}>{error}</ThemedText><Pressable onPress={fetchBooks} style={styles.retryButton}><ThemedText style={styles.retryText}>Try again</ThemedText></Pressable></View> : null}
            {!loading && !error ? <ThemedText type="smallBold" style={styles.resultHeading}>Fiction search results ({books.length})</ThemedText> : null}
          </>
        )}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.author}>{item.author_name?.slice(0, 2).join(', ') || 'Author not listed'}</ThemedText>
            <ThemedText style={styles.year}>{item.first_publish_year ? `First published: ${item.first_publish_year}` : 'Publication year not listed'}</ThemedText>
          </ThemedView>
        )}
        ListEmptyComponent={!loading && !error ? <ThemedText style={styles.statusText}>No results were returned by the API.</ThemedText> : null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 110 },
  header: { marginTop: 24, marginBottom: 6 },
  subtitle: { fontSize: 16, marginBottom: 18, opacity: 0.65 },
  apiBanner: { backgroundColor: 'rgba(181,31,58,0.10)', padding: 12, borderRadius: 10, marginBottom: 18 },
  apiBannerText: { color: '#B51F3A', fontWeight: '700', fontSize: 13 },
  resultHeading: { fontSize: 18, marginBottom: 12 },
  status: { alignItems: 'center', padding: 28, gap: 10 },
  statusText: { textAlign: 'center', opacity: 0.7, padding: 18 },
  errorBox: { borderWidth: 1, borderColor: '#B51F3A', borderRadius: 12, padding: 16, marginBottom: 16 },
  errorText: { color: '#B51F3A', marginBottom: 12 },
  retryButton: { alignSelf: 'flex-start', backgroundColor: '#B51F3A', paddingVertical: 9, paddingHorizontal: 14, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '700' },
  card: { padding: 17, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(150,150,150,0.22)' },
  bookTitle: { fontSize: 18, fontWeight: '700' },
  author: { fontSize: 14, marginTop: 6, opacity: 0.75 },
  year: { fontSize: 12, marginTop: 5, opacity: 0.6 },
});
