function calculate_xp(cards) {
  //Calcul de l'xp en fontion des taches actuelles dans le tableau
  //TODO : à changer du coup
  var actual_xp = 30;
  return actual_xp;
}

function find_actual_monster(project_id, cards) {
  var actual_xp = calculate_xp(cards);
  //Calcul pour retrouver le monstre à partir de l'xp et l'id
  //TODO : à changer du coup
  var actual_monster_lvl = 12;
  return actual_monster_lvl;
}

function calculate_monster_hp(project_id, cards) {
  var actual_monster = find_actual_monster(project_id, cards);
  //Calcul pour retrouver les PVs du monstre avec l'id et le lvl du monstre
  //TODO : à changer du coup
  var actual_monster_hp = 2500;
  return actual_monster_hp;
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
