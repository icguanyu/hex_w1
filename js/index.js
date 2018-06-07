var time = new Date()
var day_list = ['日', '一', '二', '三', '四', '五', '六'];
var today = `${time.getFullYear()}.${time.getMonth()+1}.${time.getDate()}`


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    newDate: '',
    newTime: '',
    newNote: '',
    newMark: '',
    todos:[
      {
        id: '001',
        todoTitle : '龜派氣功',
        today: '2018.6.6',
        date: '2018.9.1',
        time: '18:00',
        note: '又稱神龜衝擊波，也有直接翻譯為「卡曼哈曼波」或「卡美哈梅哈」',
        mark: true,
        completed: false
      },
      {
        id: '002',
        todoTitle : '界王拳',
        today: '2018.6.6',
        date: '2018.2.30',
        time: '18:00',
        note: '界王拳是由北界王自創的招式。是一種在短時間内將自己戰鬥力提升數倍甚至數十倍的招式，但對身體的負擔很大。',
        mark: false,
        completed: true
      },
      {
        id: '003',
        todoTitle : '尖尖碰碰拳',
        today: '2018.6.6',
        date: '2018.2.30',
        time: '25:61',
        note: '尖尖碰碰拳是《數碼寶貝》仙人掌獸的絕招之一，感謝仙人掌獸特別贊助',
        mark: false,
        completed: false
      }
    ],
    visi: 'all',
    order: 'new',
    cacheTitle: '',
    cacheNote: '',
    cacheDate: '',
    cacheTime: '',
  },
  methods:{
    addTodo: function(){
      var title = this.newTodo.trim();
      var date = this.newDate;
      var time = this.newTime;
      var note = this.newNote;
      var mark = this.newMark;
      var id = Math.floor(Date.now());
      if(!title) {
        alert('放絕招總要喊名字吧!')
        return
      }
      if(note.length>80){
        alert('字數限制80以內')
        return
      }
      this.todos.push({
        id: id,
        todoTitle : title,
        today: today,
        date: date,
        time: time,
        note: note,
        mark: mark,
        completed: false 
      })
      this.newTodo = ''
      this.newDate = ''
      this.newTime = ''
      this.newNote = ''
      this.newMark = ''
      this.hide_editarea()
    },
    markstar: function(index){
      this.filter[index].mark = !this.filter[index].mark 
      //注意index排序源自於那裡(todos--X/filter--O)
    },
    show_editarea: function(){
      $('.addtask_btn').slideUp(200)
      $('#add_newtask').slideToggle(200)
    },
    hide_editarea: function(){
      $('.addtask_btn').slideDown(200)
      $('#add_newtask').slideUp(200)
    },
    removeTodo: function(index){
      var filter_target = this.filter[index]
      //要刪除的這一筆是誰
      var target = $.inArray(filter_target,this.todos)
      console.log(target)
      //這一筆在todos裡面是第幾筆
      this.todos.splice(target ,1)
    },
    shownote: function(index){
      $('.task').eq(index).children('.note').slideToggle()
    }
  },
  computed:{
    filter: function(){
      var newTodos=[]
      switch(this.visi){
        case 'ing' :
            newTodos = this.todos.filter(function(item){
            return !item.completed
          })
          return newTodos;
          break;
        case 'done' :
            newTodos = this.todos.filter(function(item){
            return item.completed
          })
          return newTodos;
          break;
        case 'all':
          return this.todos;
          break;
      }
    },
    done: function(){
      var done = []
      done = this.todos.filter(function(item){
        return item.completed
      })
      return done.length
    },
    ing: function(){
      var ing = []
      ing = this.todos.filter(function(item){
        return !item.completed
      })
      return ing.length
    }
  }
})