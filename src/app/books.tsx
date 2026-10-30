import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const STORAGE_KEY = '@cherry/books-v1';

type BookRecord = {
  id: string;
  title: string;
  author: string;
  category: string;
};

const starterBooks: BookRecord[] = [
  { id: 'seed-1', title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fiction' },
  { id: 'seed-2', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
  { id: 'seed-3', title: 'Atomic Habits', author: 'James Clear', category: 'Self Development' },
];

export default function Books() {
  const [records, setRecords] = useState<BookRecord[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!active) return;
        if (saved) {
          const parsed = JSON.parse(saved);
          setRecords(Array.isArray(parsed) ? parsed : starterBooks);
        } else {
          setRecords(starterBooks);
        }
      } catch {
        if (active) setRecords(starterBooks);
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records)).catch(() => {
      Alert.alert('Storage error', 'Your changes could not be saved on this device.');
    });
  }, [records, ready]);

  const filteredRecords = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return records;
    return records.filter((item) =>
      [item.title, item.author, item.category].some((value) => value.toLowerCase().includes(term)),
    );
  }, [records, search]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setCategory('');
    setEditingId(null);
  };

  const saveRecord = () => {
    if (!title.trim() || !author.trim() || !category.trim()) {
      Alert.alert('Missing information', 'Please enter the title, author and category.');
      return;
    }
    if (editingId) {
      setRecords((current) => current.map((item) => item.id === editingId
        ? { ...item, title: title.trim(), author: author.trim(), category: category.trim() }
        : item));
    } else {
      setRecords((current) => [{
        id: `${Date.now()}`,
        title: title.trim(),
        author: author.trim(),
        category: category.trim(),
      }, ...current]);
    }
    resetForm();
  };

  const editRecord = (item: BookRecord) => {
    setEditingId(item.id);
    setTitle(item.title);
    setAuthor(item.author);
    setCategory(item.category);
  };

  const deleteRecord = (id: string) => {
    Alert.alert('Delete book', 'Are you sure you want to delete this record?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setRecords((current) => current.filter((item) => item.id !== id));
        if (editingId === id) resetForm();
      } },
    ]);
  };

  const renderItem = useCallback(({ item }: { item: BookRecord }) => (
    <ThemedView style={styles.bookCard}>
      <View style={styles.bookInfo}>
        <ThemedText type="smallBold" style={styles.category}>{item.category.toUpperCase()}</ThemedText>
        <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.author}>{item.author}</ThemedText>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={() => editRecord(item)} style={[styles.actionButton, styles.editButton]}>
          <ThemedText style={styles.actionText}>Edit</ThemedText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => deleteRecord(item.id)} style={[styles.actionButton, styles.deleteButton]}>
          <ThemedText style={styles.actionText}>Delete</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  ), [editingId]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={(
          <>
            <ThemedText type="subtitle" style={styles.header}>My Books</ThemedText>
            <ThemedText style={styles.subtitle}>Manage your personal book collection</ThemedText>
            <ThemedView style={styles.formCard}>
              <ThemedText type="smallBold" style={styles.formHeading}>{editingId ? 'Update book record' : 'Add a new book'}</ThemedText>
              <TextInput value={title} onChangeText={setTitle} placeholder="Book title" placeholderTextColor="#888" style={styles.input} />
              <TextInput value={author} onChangeText={setAuthor} placeholder="Author name" placeholderTextColor="#888" style={styles.input} />
              <TextInput value={category} onChangeText={setCategory} placeholder="Category (e.g. Fiction)" placeholderTextColor="#888" style={styles.input} />
              <View style={styles.formActions}>
                <Pressable onPress={saveRecord} style={styles.primaryButton}>
                  <ThemedText style={styles.primaryButtonText}>{editingId ? 'Save changes' : 'Add book'}</ThemedText>
                </Pressable>
                {editingId ? <Pressable onPress={resetForm} style={styles.cancelButton}><ThemedText>Cancel</ThemedText></Pressable> : null}
              </View>
            </ThemedView>
            <ThemedText type="smallBold" style={styles.sectionHeading}>Your collection ({records.length})</ThemedText>
            <TextInput value={search} onChangeText={setSearch} placeholder="Search title, author or category" placeholderTextColor="#888" style={styles.searchInput} />
          </>
        )}
        ListEmptyComponent={<ThemedText style={styles.emptyText}>{ready ? 'No books found. Add a book or change your search.' : 'Loading saved books...'}</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 110 },
  header: { marginTop: 24, marginBottom: 6 },
  subtitle: { fontSize: 16, marginBottom: 20, opacity: 0.65 },
  formCard: { padding: 16, borderRadius: 16, marginBottom: 22, borderWidth: 1, borderColor: 'rgba(150,150,150,0.25)' },
  formHeading: { fontSize: 17, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: 'rgba(130,130,130,0.4)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10, color: '#222', backgroundColor: '#fff' },
  formActions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 2 },
  primaryButton: { backgroundColor: '#B51F3A', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  cancelButton: { padding: 10 },
  sectionHeading: { fontSize: 18, marginBottom: 10 },
  searchInput: { borderWidth: 1, borderColor: 'rgba(130,130,130,0.4)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, marginBottom: 14, color: '#222', backgroundColor: '#fff' },
  bookCard: { padding: 16, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(150,150,150,0.22)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  bookInfo: { flex: 1 },
  category: { opacity: 0.65, fontSize: 11 },
  bookTitle: { fontSize: 19, fontWeight: '700', marginTop: 4 },
  author: { fontSize: 14, marginTop: 3, opacity: 0.7 },
  actions: { gap: 7 },
  actionButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  editButton: { backgroundColor: '#E8A83E' },
  deleteButton: { backgroundColor: '#B51F3A' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  emptyText: { textAlign: 'center', opacity: 0.65, paddingVertical: 24 },
});
