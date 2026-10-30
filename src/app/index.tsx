import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Cherry</ThemedText>
      <ThemedText style={styles.subtitleText}>Your personal world of books</ThemedText>
      <ThemedText style={styles.infoText}>Muhammad Abdullah</ThemedText>
      <ThemedText style={styles.infoTextBottom}>CS-20</ThemedText>
      <ThemedView style={styles.featuredCard}>
        <ThemedText style={styles.featuredLabel}>Featured Book</ThemedText>
        <ThemedText style={styles.featuredTitle}>The Alchemist</ThemedText>
        <ThemedText style={styles.featuredDesc}>A journey about dreams, purpose and discovering your own path.</ThemedText>
      </ThemedView>
      <ThemedText style={styles.sectionTitle}>Popular Books</ThemedText>
      {['Atomic Habits', 'The Hobbit', 'Harry Potter'].map((book) => (
        <ThemedView key={book} style={styles.listItem}><ThemedText style={styles.listText}>{book}</ThemedText></ThemedView>
      ))}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:20}, header:{marginTop:25,marginBottom:8}, subtitleText:{fontSize:18,marginBottom:28,opacity:0.65},
  infoText:{fontSize:15,marginBottom:6,opacity:0.65}, infoTextBottom:{fontSize:15,marginBottom:28,opacity:0.65},
  featuredCard:{padding:20,borderRadius:18,marginBottom:26,borderWidth:1,borderColor:'rgba(150,150,150,0.2)'},
  featuredLabel:{fontSize:15,marginBottom:7,opacity:0.6}, featuredTitle:{fontSize:25,fontWeight:'bold',marginBottom:7}, featuredDesc:{fontSize:16,lineHeight:23,opacity:0.8},
  sectionTitle:{fontSize:23,fontWeight:'bold',marginBottom:15}, listItem:{padding:16,borderRadius:12,marginBottom:10,borderWidth:1,borderColor:'rgba(150,150,150,0.2)'}, listText:{fontSize:18}
});
