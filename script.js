$(document).ready(function(){
  const ind = $('#indicator');
  const consoleDiv = $('#console');
  const inText = $('#in');
  const dirText = $('#dir');
  const passwordWrap = $('#passwordWrap');
  let curDir = '';
  let parent = '[""]';
  let inPassword = false;
  const files = {
    '': {'welcome.txt': "I see you have found my computer. <br>You won't find much here, but you can use the command 'cd' to search for other directories.<br> to move into a directory use the same command on the directory like 'cd->(name)'.<br> To move back to the previous directory do 'cd->../'"},
    'Jeff': {'Jeff.info': `
      Jeff isn't my real name. I'm stupid enough to reveal that information to you. <br>
      What I can reveal is that I was born in California.  Where is not important. <br>
      Considering you've found my computer though, I imagine you want to know more. <br>
      Can't blame you. Who wouldn't want to know more about "the best hacker in the world." <br>
      If you are really that interested, use the password "110802" to log into the missions directory. <br>
      You can enter an encrypted directory by putting the password after a question mark in the cd command like: <br>
      cd->(name)?(pass)<br>
    `},
    'missions': {'client1.txt': `
    I would like to commision a hacking please. The bakery charged me for 7 pasteries when I only ordered 6.<br>
    This injustice cannot be overlooked.<br>
    We will me meet accross the street of the local bakery at 5pm. I will bring baker's hats so we do not look suspicious. <br>
    I have read the whole wikipedia article on bread, so if any one thinks we are suspicious, leave the talking to me.<br>
    If they ask a question about bread that I cannot answer, run.<br>
    `, 're-client1.txt': `
    I have just found out that I actually only have 1 baker's hat. <br>
    You will have to bring your own. <br>
    Sorry. <br>
    `, 'client2.txt': `
    Some punk kid hacked my phone from the Apple store. <br>
    I don't know how the little rascal did it, but he posted a picture of himself on my Twitter account and publicly shamed me. <br>
    I want you to hack him back and post a picture of me on his Twitter account. <br>
    As for getting the picture, you are the best hacker of all time, so I doubt that will come as a difficult task to you. <br>
    Thank you for your services. <br>
    Payment will be discussed after the deed is complete. <br>
    `},
    'top-clients': {
      'I-can-help-you.txt': `
        I know your situation. I used to work for the big boss man. <br>
        I know we think alike. We both think he's a <br>
        <em>demon</em><br>
        Work with me.<br>
        We can take him down together.<br>
      `,
      '101010.txt': `
        Since our last exodus from Earth, as you may have noticed, we have decided to return.<br>
        It has been a good stay this round about, but we file that it is time to leave yet again.<br>
        As we have become acquainted with you on this trip, we would feel bad leaving without a goodbye.<br>
        So long and thanks for all the fish. <br>
      `
    },
    'big-boss-man': {
      "what's-up.txt": `
        Hey Jeff.<br>
        I hope your work is going well.<br>
        Your clients seem to be happy as usual.<br>
        I saw a story in the news about a bakery mysteriously losing enough money to buy one pastery.<br>
        I assume this means you are up to good work.<br>
        Don't dissapoint me.<br>
      `,
      "careful.txt": `
        I've heard multiple reports of unhappy customers lately.<br>
        You're walking on thin ice Jeff.<br>
        One more slip up and I will reveal to everyone that the password to your profile is <br>
        <em>Hunter123</em><br>
        Then everyone will know your real identity.<br>
        Careful.<br>
      `
    },
    'profile': {
      'location.info': `
        Santa Monica, California
      `,
      'user.id': `
        last: Hackerman<br>
        first: Kevin<br>
      `,
      'schedule.txt': `
        5 a.m, 10 p.m: Hacking things<br>
        10 p.m, 4 a.m: Sleeping<br>
      `,
      'talents.info': `
        1. Hacking things<br>
        2. Making lists<br>
        3. Redundancy<br>
        3. Making lists<br>
        5. inconsistancy<br>
      `,
      'Journal1.txt':`
        It's been a few days on the job now so I decided to start keeping a journal.<br>
        It's really fun doing what I love and not getting caught.<br>
        There are no consequences.<br>
      `,
      'Journal2.txt': `
        It's been a few days since the last journal entery.<br>
        My enjoyment of this occupation is decrecing at an alarming rate.<br>
        Most of my clients are complete idiots which is really starting to get on my nerves.<br>
      `,
      'Journal3.txt': `
        The boss man contacted me today.<br>
        He is pleased with my work which is good.<br>
        Hopefully I can stay on his good side.<br>
      `,
      'Journal4.txt': `
        Someone called me the best hacker of all time.<br>
        yay.<br>
        Maybe I will go down as the best hacker of all time.<br>
        My name will out live me.<br>
      `,
      'Journal5.txt': `
        I spend so much time hacking now that my days have been reduced to<br>
        shower<br>
        brush teeth<br>
      `,
      'Journal6.txt': `
        Hacked facebook again today. <br>
      `,
      'Journal7.txt': `
        NASA too<br>
      `,
      'journal8.txt': `
        I made this one lowercase to be annoying.<br>
        How long did it take for you to realize.<br>
        I dont't actually have anything to say.<br>
        I just thought it would be funny.<br>
      `
    },
  };
  const dirs = {
    '':{'NAME': '',
      'Jeff': {'Parent':'[""]', 'NAME': 'Jeff', 'PASSWORD': '', 'missions': {
        'Parent': "['']['Jeff']", 'NAME': 'missions', 'PASSWORD': '110802', 'top-clients':{
          'Parent': "['']['Jeff']['missions']", 'NAME': 'top-clients', 'PASSWORD': ''
        }, 'big-boss-man': {
          'Parent': "['']['Jeff']['missions']", 'NAME': 'big-boss-man', 'PASSWORD': 'demon'
        }
      }, 'profile': {
        'Parent': "['']['Jeff']", 'NAME': 'profile', 'PASSWORD': 'Hunter123'
      }}
    }
  }

  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  };
  getPassword = function(dir){
    if(dir["PASSWORD"] == '') return true;
  }
  let on = true;
  flash = function(){
    if(on) ind.css({'opacity': '0'});
    else ind.css({'opacity': '1'});
    on = !on;
    setTimeout(function(){flash();}, 500);
  }
  flash();
  $(document).keypress(function(e){
    e.preventDefault();
    if(e.keyCode == 8){
      temp  = inText.text().substring(0, inText.text().length-1);
      inText.text('');
      inText.append(temp);
    }
    else if(e.keyCode == 13 && !inPassword){
      consoleDiv.append('<h1>>'+inText.text()+'</h1>');
      consoleDiv.append('<h1>'+parseIn(inText.text())+'</h1>');
      inText.text('');
    }
    else inText.append(String.fromCharCode(e.which));
  });
  parseIn = function(text){
    text = text.replaceAll(' ', '');
    if(text == 'hi') return 'asdf';
    if(text == 'ls'){
      names = [];
      $.each(files[curDir], function(key, value){
        names.push(key);
      });
      return String(names).replaceAll(',', ', ');
    }
    if(text.substring(0, 6) == 'show->'){
      let key = text.substring(6);
      if(key in files[curDir]) return files[curDir][key];
      else return 'no file ' + key;
    }
    if(text == 'cd'){
      if(curDir == '') tempparent = '';
      else tempparent = parent
      dirList = [];
      $.each(eval('dirs' + tempparent + '["'+curDir+'"]'), function(key, value){
        if(key != 'Parent' && key != 'NAME' && key != 'PASSWORD') dirList.push(key);
      });
      return String(dirList).replaceAll(',', ', ');
    }
    if(text.substring(0, 4) == 'cd->'){
      let dirPass;
      if(text.indexOf('?') > -1){
        dir = text.substring(4, text.indexOf('?'));
        dirPass = text.substring(text.indexOf('?') +1);
      }
      else{
        dir = text.substring(4);
        dirPass == '';
      }
      if(curDir == '') tempparent ='';
      else tempparent = parent
      testDir = eval('dirs' + tempparent + '["'+curDir+'"]');
      if(dir == '../'){
        curDir = eval('dirs' + parent + '["NAME"]');
        parent = eval('dirs' + tempparent + '["Parent"]');
        dirText.text(curDir);
        return 'moving to ' + curDir;
      }
      else if(!(dir in testDir)) return 'no such directory';
      else if(dir in testDir){
        console.log(dirPass);
        passwordCorrect = false;
        if(eval('dirs' + tempparent + '["'+curDir+'"]["'+dir+'"]["PASSWORD"]') == '') passwordCorrect = true;
        else if(eval('dirs' + tempparent + '["'+curDir+'"]["'+dir+'"]["PASSWORD"]') == dirPass) passwordCorrect = true;
        if(passwordCorrect){
          parent = eval('dirs' + tempparent + '["'+curDir+'"]["'+dir+'"]["Parent"]');
          curDir = dir;
          dirText.text(curDir);
          return 'moving to ' + curDir;
        }
        else return 'incorrect password';
      }
    }
    if(text == '?'){
      return `
        Commands<br>
        ls: lists files<br>
        show->(filename): shows contents of specified file<br>
      `;
    }
    else return 'Not a recognized command. Type ? for help';
  }
});
