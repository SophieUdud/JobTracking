@isTest
public class BarChartControllerTest {
    @isTest
    public static void testGetResumeChartInfo(){
        
        Application__c newApp = new Application__c();
        insert newApp;
        
        Blob bodyBlob=Blob.valueOf('Unit Test ContentVersion Body to be insert in test class.'); 
        
        ContentVersion contentVersion_1 = new ContentVersion(
            Title='SampleTitle', 
            PathOnClient ='SampleTitle.jpg',
            VersionData = bodyBlob, 
            origin = 'H'
        );
        insert contentVersion_1;
        
        ContentVersion contentVersion_2 = [SELECT Id, Title, ContentDocumentId 
                                           FROM ContentVersion WHERE Id = :contentVersion_1.Id LIMIT 1];
        
        ContentDocumentLink contentlink = new ContentDocumentLink();
        contentlink.LinkedEntityId = newApp.id;
        contentlink.contentdocumentid = contentVersion_2.contentdocumentid;
        contentlink.ShareType = 'V';
        insert contentlink;
        
        System.assertEquals(contentlink.ContentDocumentId, contentVersion_2.ContentDocumentId );
        
        BarChartController.getResumeChartInfo();
    }
}