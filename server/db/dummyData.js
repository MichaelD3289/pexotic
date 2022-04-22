

const sequelize = require('../sequelize');

module.exports = {
  inputDummyData: (req, rex) => {
    sequelize
      .query(`

      INSERT INTO users (first_name,last_name,username,email,password_hash,address_line_one,city,zipcode,state,modified_at,isVendor)
      VALUES
        ('Ivana','Savage','ante.','ac.mattis.velit@yahoo.ca','HJA67KIR2CTJIM576VVCO5CH.NFG584LB754JC94GC4V','P.O. Box 906, 3243 Eget Rd.','Greenock','85575','at','Mar 3, 2023','true'),
        ('Byron','Byrd','enim.','justo.eu.arcu@google.ca','LXT93CHX1DUPVP817WPDS9KE.CIL292GN545SJ68WC0B','Ap #712-8888 Nec Rd.','Oamaru','24219','tempor','May 20, 2022','true'),
        ('Nomlanga','Duffy','amet','suscipit.est.ac@aol.org','RXF91OKU5XMYBB147YYMA3KF.CYV480CP322LW33OY5X','P.O. Box 468, 8620 Aliquam Rd.','Kaduna','45828','bibendum','Feb 9, 2023','true'),
        ('Jocelyn','Lowe','bibendum','egestas.rhoncus@yahoo.org','SWC12LWQ2NWRGF944YXGR7CP.RSN598DS108YL48FR9F','Ap #519-3879 Euismod Avenue','Aserrí','99802','Cum','Jul 1, 2022','true'),
        ('Trevor','Cummings','odio.','nibh.quisque@hotmail.couk','ZTS70CHN5VPBBK829EOSG7YN.MIR338NZ745PJ43HD3S','619-6678 Suscipit Rd.','Pachuca','83878','orci.','May 24, 2021','true');

      INSERT INTO sellers (company_name,img_url,user_id)
      VALUES
        ('Lectus Quis Massa PC','shop-placeholder.jpg','7eccef45-f8e1-4ee9-aa8b-3837cbac2919'),
        ('Sapien Molestie Associates','shop-placeholder.jpg','a951cad1-6f74-42d2-939b-24d1a908c3fd'),
        ('Ligula Donec LLP','shop-placeholder.jpg','140e0af8-0f7b-43f4-a6df-7611563a026b'),
        ('Vivamus Nisi Corporation','shop-placeholder.jpg','c0732307-2498-496c-b764-fcd65f1cf611'),
        ('Quisque Libero Ltd','shop-placeholder.jpg','6d62c555-59a6-4eec-b72c-c3cee93debeb');

      INSERT INTO subcategory (subcategory_name,category_ref)
      VALUES
        ('fringilla',4),
        ('Sed',4),
        ('leo',3),
        ('lectus',2),
        ('quis',4),
        ('sagittis',2),
        ('Maecenas',1),
        ('quam',3),
        ('purus.',4),
        ('interdum.',4),
        ('Duis',2),
        ('enim.',5),
        ('ullamcorper,',2),
        ('purus',3),
        ('libero',4),
        ('nec',4),
        ('a',4),
        ('malesuada',4),
        ('justo.',4),
        ('fames',4);

      INSERT INTO species (common_name,native_area,genus,species,modified_at)
      VALUES
        ('elementum, dui','Cundinamarca','enim.','hendrerit.','Sep 12, 2022'),
        ('eros','Zuid Holland','molestie.','mollis.','Nov 21, 2021'),
        ('Quisque libero','North Gyeongsang','Vivamus','sem.','Nov 24, 2022'),
        ('Nunc laoreet lectus','Bahia','Integer','dapibus','Aug 4, 2022'),
        ('pede.','Xīnán','Curabitur','sem.','May 24, 2021'),
        ('non ante','Zhytomyr oblast','Pellentesque','vulputate,','Sep 14, 2021'),
        ('egestas.','Oxfordshire','cursus','Mauris','Sep 29, 2021'),
        ('dapibus gravida. Aliquam','Tamil Nadu','ornare','risus','Aug 24, 2022'),
        ('lorem, luctus ut,','Distrito Capital','et','lobortis.','Jun 15, 2022'),
        ('ipsum dolor sit','Oslo','ante','scelerisque','Jul 21, 2021'),
        ('vehicula','North Island','adipiscing,','Praesent','Jan 8, 2022'),
        ('iaculis odio. Nam','Córdoba','ullamcorper,','condimentum','May 4, 2021'),
        ('orci sem','Marche','mi','enim,','Feb 15, 2023'),
        ('sollicitudin adipiscing','Bahia','eget,','vitae','May 31, 2022'),
        ('lectus pede, ultrices','Northern Territory','ut,','dictum','Mar 1, 2022'),
        ('Aliquam auctor, velit','Jeju','Aliquam','consequat,','Mar 29, 2023'),
        ('ligula eu','Anambra','tellus.','nibh','Sep 4, 2022'),
        ('hendrerit.','Belgorod Oblast','nibh.','lobortis,','Jan 18, 2022'),
        ('vitae mauris sit','Nova Scotia','Cras','ut,','Nov 1, 2021'),
        ('tristique','Huádōng','Etiam','at','Nov 23, 2021');
      

  INSERT INTO listings (listing_name,description,price,qty_in_stock,sku,shipping_price,current_discount,subcategory_id,seller_id,species_id,number_sold,modified_at,photo_url)
  VALUES
  ('elementum, dui','sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci','41.41',83,'KHO84JHV4LB','48.99','true',1,6,3,99,'Sep 12, 2022','placeholder.jpg'),
  ('eros','Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras','87.61',87,'VTY08UTX1YY','1.77','false',20,6,8,60,'Nov 21, 2021','placeholder.jpg'),
  ('Quisque libero','pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet posuere, enim nisl elementum purus, accumsan','10.39',56,'HYV95PGM3EC','34.04','false',19,6,7,35,'Nov 24, 2022','placeholder.jpg'),
  ('Nunc laoreet lectus','Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis,','79.85',64,'TNV44RKJ7SK','46.21','true',15,6,2,44,'Aug 4, 2022','placeholder.jpg'),
  ('pede.','arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a purus. Duis elementum, dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi magna sed dui. Fusce','19.61',38,'OOX18GGL6JX','78.46','false',6,7,1,80,'May 24, 2021','placeholder.jpg'),
  ('non ante','lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio','88.95',86,'XIB27NBV2IU','3.74','true',3,7,3,86,'Sep 14, 2021','placeholder.jpg'),
  ('egestas.','neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci,','61.03',3,'XVX82ILH7UK','27.58','true',9,7,7,3,'Sep 29, 2021','placeholder.jpg'),
  ('dapibus gravida. Aliquam','molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque','58.95',41,'VBQ68JLS6FT','32.80','false',8,7,8,12,'Aug 24, 2022','placeholder.jpg'),
  ('lorem, luctus ut,','neque sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac','24.99',79,'TLU76YNK2XW','93.76','false',8,7,9,37,'Jun 15, 2022','placeholder.jpg'),
  ('ipsum dolor sit','metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque','89.81',32,'DUL15OAP7ET','28.77','false',4,8,7,88,'Jul 21, 2021','placeholder.jpg'),
  ('vehicula','orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed','11.60',98,'FVS71KNQ5NM','75.47','false',1,8,2,74,'Jan 8, 2022','placeholder.jpg'),
  ('iaculis odio. Nam','ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et','16.39',14,'PUS33OHD7TR','83.32','false',5,8,8,25,'May 4, 2021','placeholder.jpg'),
  ('orci sem','nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum','7.25',14,'YMB02EOT4KT','89.97','false',7,8,8,31,'Feb 15, 2023','placeholder.jpg'),
  ('sollicitudin adipiscing','ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh','51.92',39,'PHR18VHK3UK','47.11','false',5,9,6,90,'May 31, 2022','placeholder.jpg'),
  ('lectus pede, ultrices','eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget','40.94',27,'TEJ85QMW4XG','20.85','false',13,9,2,41,'Mar 1, 2022','placeholder.jpg'),
  ('Aliquam auctor, velit','Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus','12.41',88,'NLE40GDP4SV','19.44','false',14,9,2,1,'Mar 29, 2023','placeholder.jpg'),
  ('ligula eu','ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac','66.98',44,'ZRQ57YYO6YR','47.91','true',19,10,5,94,'Sep 4, 2022','placeholder.jpg'),
  ('hendrerit.','Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris,','40.73',54,'HWV12UAJ6SF','48.92','false',14,10,3,61,'Jan 18, 2022','placeholder.jpg'),
  ('vitae mauris sit','Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis','85.32',76,'TLP73KBS5CT','92.89','false',18,10,1,100,'Nov 1, 2021','placeholder.jpg'),
  ('tristique','eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus','84.99',47,'SWL85FOJ5LV','10.79','false',17,10,1,85,'Nov 23, 2021','placeholder.jpg');
      `)
      .then(res => res.send('Tables created'))
      .catch(err => res.send(err))
  }
}