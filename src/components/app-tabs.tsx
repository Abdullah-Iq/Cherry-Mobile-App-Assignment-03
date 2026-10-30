import { Tabs } from 'expo-router';
import { Pressable, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

function CustomTabBar({ state, navigation }: any) {
  const colors = useTheme();
  const tabs = [
    { name:'index',label:'Home',icon:require('@/assets/images/tabIcons/home.png') },
    { name:'explore',label:'Explore',icon:require('@/assets/images/compass.png') },
    { name:'books',label:'My Books',icon:require('@/assets/images/book-open-cover.png') },
    { name:'favorites',label:'Favorites',icon:require('@/assets/images/heart.png') },
  ];
  return (
    <ThemedView style={[styles.tabBar,{borderColor:colors.backgroundElement}]}>
      {tabs.map((tab,index)=>{
        const isFocused=state.index===index;
        const onPress=()=>{const event=navigation.emit({type:'tabPress',target:state.routes[index].key,canPreventDefault:true});if(!isFocused&&!event.defaultPrevented)navigation.navigate(state.routes[index].name);};
        return <Pressable key={tab.name} onPress={onPress} style={styles.tab}>
          <Image source={tab.icon} style={[styles.icon,{tintColor:isFocused?colors.text:colors.textSecondary}]} resizeMode="contain"/>
          <ThemedText style={[styles.label,{color:isFocused?colors.text:colors.textSecondary}]}>{tab.label}</ThemedText>
        </Pressable>;
      })}
    </ThemedView>
  );
}
export default function AppTabs(){
  return <Tabs screenOptions={{headerShown:false}} tabBar={(props)=><CustomTabBar {...props}/>}>
    <Tabs.Screen name="index" options={{title:'Home'}}/><Tabs.Screen name="explore" options={{title:'Explore'}}/>
    <Tabs.Screen name="books" options={{title:'My Books'}}/><Tabs.Screen name="favorites" options={{title:'Favorites'}}/>
  </Tabs>;
}
const styles=StyleSheet.create({
  tabBar:{position:'absolute',left:0,right:0,bottom:50,minHeight:68,flexDirection:'row',alignItems:'center',justifyContent:'space-around',borderWidth:1,borderRadius:25,paddingTop:8,paddingBottom:8,elevation:8,shadowOffset:{width:0,height:-4},shadowOpacity:0.15,shadowRadius:8},
  tab:{flex:1,alignItems:'center',justifyContent:'center',gap:3},icon:{width:23,height:23},label:{fontSize:11,fontWeight:'500'}
});
