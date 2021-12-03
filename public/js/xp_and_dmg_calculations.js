// Local PRNG: does not affect Math.random.
var seedrandom = require('seedrandom');
var dmg_assignees = 40;
var dmg_labels = 20;
var dmg_desc = 30;

var max_monster_hp = 4000;
var min_monster_hp = 2000;


function calculate_xp(cards) {
  var calculated_dmg = 0;
  cards.forEach(card => {
    if (card.assignees.length > 0) {
      calculated_dmg += 40;
    }
    if (card.labels.length > 0) {
      calculated_dmg += 20;
    }
    if (card.body != null) {
      if (card.body != "") {
        calculated_dmg += 30;
      }
    }
  });

  return calculated_dmg;
}

function find_actual_monster(monsters_hp_list, cards) {
  var actual_xp = calculate_xp(cards);

  var i = 0;
  while (actual_xp - monsters_hp_list[i] > 0) {
    actual_xp = actual_xp - monsters_hp_list[i];
  }

  if (actual_xp != 0) {
    monster_take_damage(monsters_hp_list[i], actual_xp);
  }

  var actual_monster_lvl = i + 1;
  return actual_monster_lvl;
}

function monster_take_damage(monster_hp, damage) {
  var new_monster_hp = -1;
  if (damage > 0) {
    new_monster_hp = monster_take_damage - damage;
  }

  return new_monster_hp;
}

function take_xp(actual_xp, xp) {
  var new_xp_value = -1;
  if (xp > 0) {
    new_xp_value = actual_xp + xp;
  }

  return new_xp_value;
}

function get_monsters_hp_list(project_id) {
  var rng = seedrandom(project_id);

  //Calcul pour retrouver les PVs du monstre avec l'id et le lvl du monstre
  var total_dmg = dmg_assignees + dmg_labels + dmg_desc;
  var total_monsters_hp = cards.length*total_dmg;
  var actual_monsters_total = total_monsters_hp;
  var monsters_hp_array = [];

  var rand_hp = Math.floor(rng() * (max_monster_hp - min_monster_hp + 1) + min_monster_hp);
  var i = 0;

  while (actual_monsters_total - rand_hp > 0) {
    monsters_hp_array[i] = rand_hp;
    i = i + 1;
  }

  if (actual_monsters_total != 0) {
    monsters_hp_array[i] = actual_monsters_total;
  }

  return monsters_hp_array;
}
